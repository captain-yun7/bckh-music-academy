'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useCallback, useRef, useState } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = '내용을 입력하세요...' }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: {
          style: 'max-width: 100%; height: auto;',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          style: 'color: #3b82f6; text-decoration: underline;',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: 'outline: none; min-height: 300px; padding: 16px;',
      },
    },
  });

  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('업로드 실패');
      }

      const data = await res.json();
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  }, [editor]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
    e.target.value = '';
  }, [handleImageUpload]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('링크 URL을 입력하세요:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const buttonStyle = (isActive: boolean = false) => ({
    padding: '6px 10px',
    backgroundColor: isActive ? '#111' : '#fff',
    color: isActive ? '#fff' : '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 500 as const,
    cursor: 'pointer' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minWidth: '32px',
    height: '32px',
  });

  const dividerStyle = {
    width: '1px',
    height: '24px',
    backgroundColor: '#e5e7eb',
    margin: '0 4px',
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        padding: '8px',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        alignItems: 'center',
      }}>
        {/* Text Style */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={buttonStyle(editor.isActive('bold'))}
          title="굵게"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={buttonStyle(editor.isActive('italic'))}
          title="기울임"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          style={buttonStyle(editor.isActive('underline'))}
          title="밑줄"
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          style={buttonStyle(editor.isActive('strike'))}
          title="취소선"
        >
          <span style={{ textDecoration: 'line-through' }}>S</span>
        </button>

        <div style={dividerStyle} />

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={buttonStyle(editor.isActive('heading', { level: 2 }))}
          title="제목 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          style={buttonStyle(editor.isActive('heading', { level: 3 }))}
          title="제목 3"
        >
          H3
        </button>

        <div style={dividerStyle} />

        {/* Text Align */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          style={buttonStyle(editor.isActive({ textAlign: 'left' }))}
          title="왼쪽 정렬"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="18" y2="18" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          style={buttonStyle(editor.isActive({ textAlign: 'center' }))}
          title="가운데 정렬"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="6" y1="12" x2="18" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          style={buttonStyle(editor.isActive({ textAlign: 'right' }))}
          title="오른쪽 정렬"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="9" y1="12" x2="21" y2="12" />
            <line x1="6" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div style={dividerStyle} />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={buttonStyle(editor.isActive('bulletList'))}
          title="글머리 기호"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="4" cy="6" r="1.5" fill="currentColor" />
            <circle cx="4" cy="12" r="1.5" fill="currentColor" />
            <circle cx="4" cy="18" r="1.5" fill="currentColor" />
            <line x1="9" y1="6" x2="21" y2="6" />
            <line x1="9" y1="12" x2="21" y2="12" />
            <line x1="9" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={buttonStyle(editor.isActive('orderedList'))}
          title="번호 매기기"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <text x="2" y="8" fontSize="6" fill="currentColor" stroke="none">1</text>
            <text x="2" y="14" fontSize="6" fill="currentColor" stroke="none">2</text>
            <text x="2" y="20" fontSize="6" fill="currentColor" stroke="none">3</text>
            <line x1="9" y1="6" x2="21" y2="6" />
            <line x1="9" y1="12" x2="21" y2="12" />
            <line x1="9" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div style={dividerStyle} />

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          style={buttonStyle(editor.isActive('blockquote'))}
          title="인용구"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={addLink}
          style={buttonStyle(editor.isActive('link'))}
          title="링크"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>

        <div style={dividerStyle} />

        {/* Image Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          style={{
            ...buttonStyle(),
            opacity: isUploading ? 0.5 : 1,
          }}
          title="이미지 삽입"
        >
          {isUploading ? (
            <span style={{ fontSize: '12px' }}>...</span>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          )}
        </button>

        <div style={dividerStyle} />

        {/* Horizontal Rule */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          style={buttonStyle()}
          title="구분선"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
          </svg>
        </button>

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          style={{
            ...buttonStyle(),
            opacity: editor.can().undo() ? 1 : 0.4,
          }}
          title="실행 취소"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v6h6" />
            <path d="M3 13a9 9 0 1 0 3-7.7L3 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          style={{
            ...buttonStyle(),
            opacity: editor.can().redo() ? 1 : 0.4,
          }}
          title="다시 실행"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 7v6h-6" />
            <path d="M21 13a9 9 0 1 1-3-7.7L21 7" />
          </svg>
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Editor Styles */}
      <style jsx global>{`
        .tiptap {
          min-height: 300px;
          font-size: 15px;
          line-height: 1.8;
        }
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .tiptap h2 {
          font-size: 1.5em;
          font-weight: 700;
          margin: 1em 0 0.5em;
        }
        .tiptap h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin: 1em 0 0.5em;
        }
        .tiptap ul, .tiptap ol {
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        .tiptap li {
          margin: 0.25em 0;
        }
        .tiptap blockquote {
          border-left: 3px solid #d1d5db;
          padding-left: 1em;
          margin: 1em 0;
          color: #6b7280;
        }
        .tiptap hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 1.5em 0;
        }
        .tiptap img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          border-radius: 8px;
        }
        .tiptap a {
          color: #3b82f6;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
