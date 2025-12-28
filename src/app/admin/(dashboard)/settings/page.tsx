'use client';

import { useState, useEffect } from 'react';

interface Admin {
  id: string;
  email: string;
  name: string;
}

export default function SettingsPage() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 비밀번호 변경
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.admin) {
          setAdmin(data.admin);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setIsChangingPassword(true);

    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '비밀번호 변경에 실패했습니다.');
      }

      setPasswordSuccess('비밀번호가 성공적으로 변경되었습니다.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
        로딩중...
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px' }}>
        설정
      </h1>

      {/* 계정 정보 */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
          계정 정보
        </h2>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '4px' }}>
              이메일
            </label>
            <p style={{ fontSize: '15px', fontWeight: 500 }}>{admin?.email}</p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '4px' }}>
              이름
            </label>
            <p style={{ fontSize: '15px', fontWeight: 500 }}>{admin?.name}</p>
          </div>
        </div>
      </div>

      {/* 비밀번호 변경 */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
          비밀번호 변경
        </h2>

        <form onSubmit={handlePasswordChange} style={{ maxWidth: '400px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '6px',
            }}>
              현재 비밀번호
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '6px',
            }}>
              새 비밀번호
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '6px',
            }}>
              새 비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
          </div>

          {passwordError && (
            <p style={{
              color: '#ef4444',
              fontSize: '14px',
              marginBottom: '16px',
              padding: '10px',
              backgroundColor: '#fef2f2',
              borderRadius: '6px',
            }}>
              {passwordError}
            </p>
          )}

          {passwordSuccess && (
            <p style={{
              color: '#22c55e',
              fontSize: '14px',
              marginBottom: '16px',
              padding: '10px',
              backgroundColor: '#f0fdf4',
              borderRadius: '6px',
            }}>
              {passwordSuccess}
            </p>
          )}

          <button
            type="submit"
            disabled={isChangingPassword}
            style={{
              padding: '12px 24px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isChangingPassword ? 'not-allowed' : 'pointer',
              opacity: isChangingPassword ? 0.7 : 1,
            }}
          >
            {isChangingPassword ? '변경 중...' : '비밀번호 변경'}
          </button>
        </form>
      </div>
    </div>
  );
}
