'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

// 년도별 합격자 데이터 (khmusic.co.kr 실제 데이터)
const admissionsByYear: Record<string, { summary: string; students: { name: string; school: string; major: string }[] }> = {
  '2025': {
    summary: '서울예대 외 32명',
    students: [
      { name: '곽*민', school: '서울예술대학교', major: '베이스' },
      { name: '곽*민', school: '동아방송예술대학교', major: '베이스' },
      { name: '강*지', school: '동덕여자대학교', major: '피아노' },
      { name: '이*환', school: '서경대학교', major: '기타' },
      { name: '이*진', school: '홍익대학교', major: '기타' },
      { name: '곽*민', school: '한양대학교', major: '베이스' },
      { name: '최*민', school: '호원대학교', major: 'K-POP 보컬' },
      { name: '강*지', school: '백석예술대학교', major: '피아노' },
      { name: '손*서', school: '백석예술대학교', major: '베이스' },
      { name: '김*나', school: '백석예술대학교', major: '교회실용음악 피아노' },
      { name: '박*진', school: '여주대학교', major: '싱어송라이터' },
      { name: '이*원', school: '여주대학교', major: '기타' },
      { name: '손*서', school: '국제예술대학교', major: '프로듀싱' },
      { name: '양*우', school: '국제예술대학교', major: '프로듀싱' },
      { name: '이*원', school: '용인대학교', major: '기타' },
      { name: '박*진', school: '정화예술대학교', major: '싱어송라이터' },
      { name: '최*완', school: '정화예술대학교', major: '기타' },
      { name: '천*영', school: '김포대학교', major: '보컬' },
      { name: '김*빈', school: '재능대학교', major: '보컬' },
      { name: '이*원', school: '청운대학교', major: '기타' },
    ],
  },
  '2024': {
    summary: '서울예대 외 22명',
    students: [
      { name: '이*비', school: '동아방송예술대학교', major: '작곡' },
      { name: '김*래', school: '호원대학교', major: '작곡' },
      { name: '차*서', school: '호원대학교', major: 'K-POP' },
      { name: '이*비', school: '홍익대학교', major: '작곡' },
      { name: '김*래', school: '경희대학교', major: '포스트모던음악 작곡' },
      { name: '이*진', school: '백석예술대학교', major: '피아노' },
      { name: '최*늘', school: '백석예술대학교', major: '교회실용음악 보컬' },
      { name: '허*진', school: '정화예술대학교', major: '보컬' },
      { name: '나*성', school: '정화예술대학교', major: '드럼' },
      { name: '최*은', school: '정화예술대학교', major: '싱어송라이터' },
      { name: '차*서', school: '정화예술대학교', major: '피아노' },
      { name: '김*빈', school: '서울신학대학교', major: '피아노' },
      { name: '윤*연', school: '재능대학교', major: '보컬' },
      { name: '이*진', school: '신안산대학교', major: '피아노' },
      { name: '윤*연', school: '김포대학교', major: '보컬' },
      { name: '박*현', school: '김포대학교', major: '보컬' },
      { name: '이*진', school: 'KAC 한국예술원', major: '피아노' },
      { name: '최*혜', school: '서울공연예술고등학교', major: '보컬' },
      { name: '문*솔', school: '서서울생활과학고등학교', major: '보컬' },
      { name: '송*원', school: '서서울생활과학고등학교', major: '보컬' },
    ],
  },
  '2023': {
    summary: '서울예대 외 40명',
    students: [
      { name: '박*혁', school: '서울예술대학교', major: '기타' },
      { name: '김*늬', school: '서울예술대학교', major: '전자음악' },
      { name: '손*서', school: '동아방송예술대학교', major: '드럼' },
      { name: '김*성', school: '동아방송예술대학교', major: '베이스' },
      { name: '손*서', school: '호원대학교', major: '드럼' },
      { name: '김*성', school: '호원대학교', major: '베이스' },
      { name: '손*서', school: '명지전문대학교', major: '드럼' },
      { name: '김*성', school: '성신여자대학교', major: '재즈피아노' },
      { name: '김*성', school: '여주대학교', major: '재즈피아노' },
      { name: '장*성', school: '여주대학교', major: '기타' },
      { name: '이*현', school: '여주대학교', major: '기타' },
      { name: '최*윤', school: '백석예술대학교', major: '보컬' },
      { name: '김*찬', school: '백석예술대학교', major: '기타' },
      { name: '장*성', school: '백석예술대학교', major: '기타' },
      { name: '곽*현', school: '백석예술대학교', major: '기타' },
      { name: '김*서', school: '국제예술대학교', major: '기타' },
      { name: '손*호', school: '백제예술대학교', major: '미디' },
      { name: '김*현', school: '수원여자대학교', major: '재즈피아노' },
      { name: '김*민', school: '정화예술대학교', major: '보컬' },
      { name: '장*기', school: '정화예술대학교', major: '보컬' },
      { name: '김*늘', school: '정화예술대학교', major: '보컬' },
      { name: '김*민', school: '정화예술대학교', major: '미디' },
      { name: '김*서', school: '재능대학교', major: '기타' },
      { name: '박*른', school: '재능대학교', major: '보컬' },
      { name: '김*온', school: '재능대학교', major: '드럼' },
      { name: '이*환', school: '서울공연예술고등학교', major: '기타' },
      { name: '김*아', school: '서서울생활과학고등학교', major: '베이스' },
      { name: '김*현', school: '금천문화예술정보학교', major: '보컬' },
      { name: '이*빈', school: '서경대학교 위탁교육원', major: '작곡' },
    ],
  },
  '2022': {
    summary: '서울예대 외 34명',
    students: [
      { name: '이*우', school: '서울예술대학교', major: '기타' },
      { name: '정*영', school: '서울예술대학교', major: '작곡' },
      { name: '이*린', school: '호원대학교', major: '재즈피아노' },
      { name: '이*진', school: '호원대학교', major: '작곡' },
      { name: '이*우', school: '호원대학교', major: '기타' },
      { name: '조*영', school: '한양대학교', major: '드럼' },
      { name: '김*민', school: '여주대학교', major: '보컬' },
      { name: '김*원', school: '여주대학교', major: '탑라이너' },
      { name: '이*진', school: '여주대학교', major: '작곡' },
      { name: '백*경', school: '여주대학교', major: '싱어송라이터' },
      { name: '황*진', school: '여주대학교', major: '베이스' },
      { name: '권*빈', school: '백석예술대학교', major: '보컬' },
      { name: '황*빛', school: '백석예술대학교', major: '작곡' },
      { name: '김*성', school: '백석예술대학교', major: '재즈피아노' },
      { name: '백*경', school: '백석예술대학교', major: '싱어송라이터' },
      { name: '이*영', school: '백석예술대학교', major: '교회실용음악 보컬' },
      { name: '정*영', school: '용인대학교', major: '작곡' },
      { name: '김*늬', school: '백제예술대학교', major: '미디' },
      { name: '백*경', school: '백제예술대학교', major: '싱어송라이터' },
      { name: '방*연', school: '백제예술대학교', major: 'KPOP 보컬' },
      { name: '이*현', school: '정화예술대학교', major: '기타' },
      { name: '김*원', school: '정화예술대학교', major: '싱어송라이터' },
      { name: '박*석', school: '정화예술대학교', major: '보컬' },
      { name: '권*빈', school: '정화예술대학교', major: '보컬' },
      { name: '방*연', school: '동서울대학교', major: 'KPOP' },
      { name: '정*영', school: '중부대학교', major: '작곡' },
      { name: '이*우', school: '재능대학교', major: '보컬' },
      { name: '강*지', school: '서울공연예술고등학교', major: '피아노 수석' },
      { name: '곽*민', school: '서울실용음악고등학교', major: '베이스' },
      { name: '곽*민', school: '서서울생활과학고등학교', major: '베이스' },
      { name: '장*미', school: '서서울생활과학고등학교', major: '피아노' },
      { name: '주*모', school: '아현산업정보학교', major: '보컬' },
    ],
  },
  '2021': {
    summary: '서울예대 외 32명',
    students: [
      { name: '정원채', school: '서울예술대학교', major: '드럼' },
      { name: '조은영', school: '서울예술대학교', major: '드럼' },
      { name: '최광석', school: '동아방송예술대학교', major: '보컬' },
      { name: '윤채원', school: '한양대학교', major: '보컬' },
      { name: '오병진', school: '한양대학교', major: '보컬' },
      { name: '박도영', school: '호원대학교', major: '보컬' },
      { name: '최광석', school: '호원대학교', major: '보컬' },
      { name: '이성근', school: '호원대학교', major: '보컬' },
      { name: '이지은', school: '호원대학교', major: '보컬' },
      { name: '최광석', school: '서경대학교', major: '보컬' },
      { name: '이지은', school: '홍익대학교', major: '보컬' },
      { name: '정원채', school: '경희대학교', major: '포스트모던음악 드럼' },
      { name: '박원', school: '단국대학교', major: '뉴뮤직 작곡' },
      { name: '송태웅', school: '백석예술대학교', major: '뮤직테크놀로지' },
      { name: '박원', school: '백석예술대학교', major: '싱어송라이터' },
      { name: '유시찬', school: '백석예술대학교', major: '교회실용음악 보컬' },
      { name: '김시원', school: '여주대학교', major: '피아노' },
      { name: '양호준', school: '여주대학교', major: '싱어송라이터' },
      { name: '정원채', school: '여주대학교', major: '드럼' },
      { name: '조은영', school: '여주대학교', major: '드럼' },
      { name: '유시찬', school: '백석대학교', major: '보컬' },
      { name: '이유진', school: '호서대학교', major: '작곡' },
      { name: '민예슬', school: '백제예술대학교', major: '미디' },
      { name: '이유진', school: '수원여자대학교', major: '작곡' },
      { name: '박원', school: '정화예술대학교', major: '작곡' },
      { name: '김은실', school: '정화예술대학교', major: '보컬' },
      { name: '민예슬', school: '정화예술대학교', major: '미디' },
      { name: '김예진', school: '백석대학교 평생교육신학원', major: '피아노' },
    ],
  },
  '2020': {
    summary: '서울예대 외 35명',
    students: [
      { name: '이은비', school: '동아방송예술대학', major: '작곡' },
      { name: '정하영', school: '동아방송예술대학', major: '작곡' },
      { name: '이은비', school: '한양대학교', major: '작곡' },
      { name: '김선경', school: '호원대학교', major: '피아노' },
      { name: '박도영', school: '서경대학교', major: '보컬' },
      { name: '박원', school: '경희대학교', major: '포스트모던음악 작곡' },
      { name: '이은비', school: '홍익대학교', major: '작곡' },
      { name: '박원', school: '홍익대학교', major: '작곡' },
      { name: '박도영', school: '홍익대학교', major: '보컬' },
      { name: '유현준', school: '백석예술대학교', major: '베이스' },
      { name: '박도영', school: '백석예술대학교', major: '싱어송라이터' },
      { name: '황인범', school: '백석예술대학교', major: '싱어송라이터' },
      { name: '정하영', school: '백석예술대학교', major: '작곡' },
      { name: '박민혁', school: '백석예술대학교', major: '기타' },
      { name: '홍예서', school: '백석예술대학교', major: '교회실용음악 보컬' },
      { name: '신해찬', school: '여주대학교', major: '뮤직프로덕션' },
      { name: '전민기', school: '백석대학교', major: '제작프로듀서' },
      { name: '박지혜', school: '수원여자대학교', major: '작곡' },
      { name: '조연우', school: '정화예술대학교', major: '재즈피아노' },
      { name: '김지수', school: '정화예술대학교', major: '재즈피아노' },
      { name: '조연우', school: '백제예술대학교', major: '재즈피아노' },
      { name: '송영우', school: '용인대학교', major: '보컬' },
      { name: '조연우', school: '동서울대학교', major: '재즈피아노' },
      { name: '송영우', school: '서울신학대학교', major: '보컬' },
      { name: '이종훈', school: '백석문화대학교', major: '컴퓨터음악작곡' },
      { name: '황인범', school: '장안대학교', major: '싱어송라이터' },
      { name: '강나연', school: '재능대학교', major: '보컬' },
      { name: '박민혁', school: '청운대학교', major: '기타' },
      { name: '송영우', school: '성결대학교', major: '현대실용음악 보컬' },
      { name: '조연우', school: '예원예술대학교', major: '재즈피아노' },
      { name: '고동현', school: '서서울생활과학고등학교', major: '드럼' },
    ],
  },
  '2019': {
    summary: '서울예대 외 14명',
    students: [
      { name: '임나은', school: '동아방송예술대학', major: '보컬' },
      { name: '전현우', school: '명지전문대학', major: '보컬' },
      { name: '김동혁', school: '백석예술대학', major: '드럼' },
      { name: '김민규', school: '백석예술대학', major: '드럼' },
      { name: '권아연', school: '백석예술대학', major: '보컬' },
      { name: '조주현', school: '백석예술대학', major: '뮤직테크놀로지' },
      { name: '김예진', school: '백석예술대학', major: '교회실용음악 피아노' },
      { name: '임나은', school: '국제예술대학', major: '보컬' },
      { name: '육정근', school: '백제예술대학', major: '작곡' },
      { name: '임나은', school: '한양여자대학', major: '보컬' },
      { name: '육정근', school: '강동대학교', major: '작곡' },
      { name: '박하은', school: '강동대학교', major: '싱어송라이터' },
      { name: '임나은', school: '정화예술대학', major: '보컬' },
      { name: '박원', school: '정화예술대학', major: '작곡' },
    ],
  },
  '2018': {
    summary: '서울예대 외 26명',
    students: [
      { name: '장진우', school: '서울예술대학교', major: '보컬' },
      { name: '신동규', school: '동아방송예술대학교', major: '기타' },
      { name: '장진우', school: '동아방송예술대학교', major: '보컬' },
      { name: '장진우', school: '한양대학교', major: '보컬' },
      { name: '김영찬', school: '경희대학교', major: '포스트모던음악 작곡' },
      { name: '유정은', school: '백석예술대학', major: '보컬' },
      { name: '윤동현', school: '백석예술대학', major: '보컬' },
      { name: '오동훈', school: '백석예술대학', major: '기타' },
      { name: '박세웅', school: '백석예술대학', major: '베이스' },
      { name: '한지훈', school: '백제예술대학', major: '기타' },
      { name: '김홍빈', school: '서울신학대학', major: '보컬' },
      { name: '서정훈', school: '호서대학교', major: '기타' },
      { name: '정승철', school: '중부대학교', major: '기타' },
      { name: '서정훈', school: '평택대학교', major: '기타' },
      { name: '김혜진', school: '백석문화대학', major: '미디' },
      { name: '윤동현', school: '정화예술대학', major: '보컬' },
      { name: '서정훈', school: '신안산대학교', major: '기타' },
      { name: '이상현', school: '추계예술대학', major: '보컬' },
    ],
  },
  '2017': {
    summary: '서울예대 외 30명',
    students: [
      { name: '김태인', school: '서울예술대학', major: '기타 (18살 조기입학)' },
      { name: '설다혜', school: '서울예술대학', major: '재즈 바이올린' },
      { name: '유재은', school: '서울예술대학', major: '작곡' },
      { name: '유정은', school: '한양대학교', major: '보컬' },
      { name: '김홍비', school: '동아방송예술대학', major: '베이스' },
      { name: '정지석', school: '동아방송예술대학', major: '싱어송라이팅' },
      { name: '최연정', school: '동아방송예술대학', major: '보컬' },
      { name: '이종훈', school: '호원대학교', major: '베이스' },
      { name: '김홍비', school: '동덕여자대학교', major: '베이스' },
      { name: '박은총', school: '동덕여자대학교', major: '피아노' },
      { name: '유호정', school: '단국대학교', major: '재즈바이올린' },
      { name: '설다혜', school: '경희대학교', major: '포스트모던음악 재즈바이올린' },
      { name: '설다혜', school: '성신여자대학교', major: '현대실용음악 재즈바이올린' },
      { name: '정종현', school: '여주대학교', major: '기타' },
      { name: '정지석', school: '백석예술대학', major: '싱어송라이팅' },
      { name: '설다혜', school: '백석예술대학', major: '재즈바이올린' },
      { name: '김민주', school: '백석예술대학', major: '피아노' },
      { name: '박세웅', school: '백석예술대학', major: '베이스' },
      { name: '박찬영', school: '백석예술대학', major: '드럼' },
      { name: '유호정', school: '백석대학교', major: '재즈바이올린' },
      { name: '유재은', school: '수원여자대학', major: '작곡' },
      { name: '최연정', school: '수원여자대학', major: '보컬' },
      { name: '신승원', school: '청운대학교', major: '드럼' },
      { name: '신승원', school: '백석문화대학', major: '드럼' },
      { name: '박찬영', school: '국제예술대학', major: '드럼' },
      { name: '최연정', school: '서경대 콘서바토리', major: '보컬' },
    ],
  },
  '2016': {
    summary: '서울예대 외 35명',
    students: [
      { name: '김치호', school: '서울예술대학', major: '드럼' },
      { name: '유승균', school: '서울예술대학', major: '작곡' },
      { name: '김동현', school: '호원대학교', major: '작곡' },
      { name: '유승균', school: '동아방송예술대학', major: '작곡' },
      { name: '김치호', school: '경희대학교', major: '포스트모던음악 드럼' },
      { name: '이동현', school: '백석예술대학', major: '작곡' },
      { name: '정철규', school: '백석예술대학', major: '보컬' },
      { name: '장진우', school: '백석예술대학', major: '싱어송라이터' },
      { name: '김치호', school: '백석예술대학', major: '드럼' },
      { name: '박은총', school: '백석예술대학', major: '피아노' },
      { name: '설다빛', school: '백석예술대학', major: '피아노' },
      { name: '유상아', school: '수원여자대학', major: '작곡' },
      { name: '신예원', school: '국제예술대학', major: '작곡' },
      { name: '차윤서', school: '명지대학교', major: '실용무용' },
    ],
  },
  '2015': {
    summary: '서울예대 외 40명',
    students: [
      { name: '이도현', school: '동아방송예술대학', major: '싱어송라이터' },
      { name: '유승균', school: '동아방송예술대학', major: '작곡' },
      { name: '김치호', school: '동아방송예술대학', major: '드럼' },
      { name: '김성호', school: '동아방송예술대학', major: '작곡' },
      { name: '이성우', school: '경희대학교', major: '포스트모던음악 드럼' },
      { name: '김성호', school: '한양대학교', major: '작곡' },
      { name: '김홍비', school: '한양여자대학교', major: '베이스' },
      { name: '최한나', school: '한양여자대학교', major: '작곡' },
      { name: '이도현', school: '서경대학교', major: '작곡' },
      { name: '이다미', school: 'Conservatorium Van Amsterdam', major: 'Jazz Vocal' },
      { name: '이도현', school: '백석예술대학교', major: '싱어송라이터' },
      { name: '김지윤', school: '백석예술대학교', major: '작곡' },
      { name: '김지윤', school: '경기대학교', major: '전자디지털음악 작곡' },
      { name: '윤희상', school: '목원대학교', major: '작곡재즈 드럼' },
      { name: '김지윤', school: '재능대학교', major: '작곡' },
    ],
  },
  '2014': {
    summary: '서울예대 외 45명',
    students: [
      { name: '정혜원', school: '서울예술대학교', major: 'Trombone' },
      { name: '문지원', school: '동아방송예술대학교', major: 'Piano' },
      { name: '김성호', school: '동아방송예술대학교', major: 'Composing' },
      { name: '이나영', school: '경희대학교', major: '포스트모던음악 Piano' },
      { name: '강병극', school: '경희대학교', major: '포스트모던음악 Piano' },
      { name: '김영석', school: '경희대학교', major: '포스트모던음악 Drums' },
      { name: '문지원', school: '한양대학교', major: 'Piano' },
      { name: '김민찬', school: '한양대학교', major: 'Vocal' },
      { name: '유지혜', school: '단국대학교', major: 'Vocal' },
      { name: '정혜원', school: '단국대학교', major: 'Trombone' },
      { name: '이진주', school: '백석예술대학교', major: 'Composing' },
      { name: '김예림', school: '백석예술대학교', major: '교회실용음악 Vocal' },
      { name: '오민석', school: '국제예술대학', major: 'Vocal' },
      { name: '김성호', school: '국제예술대학', major: 'Composing' },
      { name: '김영석', school: '장안대학교', major: 'Drums' },
      { name: '이성훈', school: '추계예술대학교', major: 'Vocal' },
      { name: '조연주', school: '추계예술대학교', major: 'Composing' },
      { name: '손미래', school: '추계예술대학교', major: 'Vocal' },
      { name: '한다운', school: '추계예술대학교', major: 'Vocal' },
      { name: '김건우', school: '서울공연예술고등학교', major: 'Drums' },
      { name: '강승완', school: '서울공연예술고등학교', major: 'Vocal' },
    ],
  },
  '2013': {
    summary: '서울예대 외 38명',
    students: [
      { name: '이은총', school: '호원대학교', major: 'Guitar' },
      { name: '박태민', school: '동아방송예술대학', major: 'Guitar' },
      { name: '문용환', school: '경희대학교', major: '포스트모던음악 Drums' },
      { name: '김영석', school: '경희대학교', major: '포스트모던음악 Drums' },
      { name: '박태민', school: '경희대학교', major: '포스트모던음악 Guitar' },
      { name: '이석원', school: '단국대학교', major: 'Piano' },
      { name: '문용환', school: '단국대학교', major: 'Drums' },
      { name: '고아라', school: '명지전문대학', major: 'Vocal' },
      { name: '최석진', school: '백석예술대학', major: 'Vocal' },
      { name: '김홍빈', school: '백석예술대학', major: 'Vocal' },
      { name: '박태민', school: '백석예술대학', major: 'Guitar' },
      { name: '이석원', school: '백석예술대학', major: 'Piano' },
      { name: '이상혁', school: '백석예술대학', major: 'Bass' },
      { name: '남예진', school: '백제예술대학', major: 'Composition' },
      { name: '홍라원', school: '백제예술대학', major: 'Composition' },
      { name: '장혜련', school: '경기대학교', major: '전자디지털음악 Composition' },
      { name: '조은지', school: '국제예술대학', major: 'Vocal' },
      { name: '박태민', school: '국제예술대학', major: 'Guitar' },
      { name: '박슬비', school: '국제예술대학', major: 'Piano' },
      { name: '한주희', school: '재능대학교', major: 'Piano' },
      { name: '이상혁', school: '서경대학교', major: '재즈 Bass' },
      { name: '박미옥', school: '서울신학대학교', major: 'Vocal' },
      { name: '최유리', school: '서울신학대학교', major: 'Vocal' },
      { name: '박민', school: '서울신학대학교', major: 'Vocal' },
    ],
  },
  '2012': {
    summary: '서울예대 외 42명',
    students: [
      { name: '허민희', school: '서울예술대학', major: 'Vocal' },
      { name: '박지원', school: '서울예술대학', major: 'Bass' },
      { name: '한진실', school: '서울예술대학', major: 'Composition' },
      { name: '한진실', school: '동아방송예술대학', major: 'Composition' },
      { name: '조효영', school: '동아방송예술대학', major: 'Songwriting' },
      { name: '신이삭', school: '동아방송예술대학', major: 'Drums' },
      { name: '박지원', school: '경희대학교', major: '포스트모던음악 Bass' },
      { name: '이한범', school: '경희대학교', major: '포스트모던음악 Bass' },
      { name: '명누리', school: '한양대학교', major: 'Vocal' },
      { name: '고영호', school: '단국대학교', major: 'Drums' },
      { name: '이석영', school: '단국대학교', major: 'Vocal' },
      { name: '조인호', school: '백석대학교', major: 'Guitar' },
      { name: '박미옥', school: '백석대학교', major: 'Composition' },
      { name: '양서영', school: '호서대학교', major: 'Composition' },
      { name: '신민경', school: '경기대학교', major: '전자디지털음악 Composition' },
      { name: '문선화', school: '백제예술대학', major: 'Composition' },
      { name: '이유진', school: '백제예술대학', major: 'Composition' },
      { name: '조인호', school: '백제예술대학', major: 'Guitar' },
      { name: '김희애', school: '백제예술대학', major: 'Piano' },
      { name: '이석영', school: '백제예술대학', major: 'Vocal' },
      { name: '고은혜', school: '나사렛대학교', major: 'Vocal' },
      { name: '김희애', school: '재능대학교', major: 'Piano 차석' },
      { name: '강모든', school: '재능대학교', major: 'Composition' },
      { name: '이유진', school: '재능대학교', major: 'Composition' },
      { name: '이석영', school: '추계예술대학교', major: 'Vocal' },
      { name: '박현우', school: '추계예술대학교', major: 'Vocal' },
      { name: '류신혜', school: '추계예술대학교', major: 'Vocal' },
    ],
  },
  '2011': {
    summary: '서울예대 외 40명',
    students: [
      { name: '조수진', school: '동아예술방송대학', major: 'SongWriting' },
      { name: '서인혜', school: '동아예술방송대학', major: 'Piano' },
      { name: '최진원', school: '경희대학교', major: '포스트모던음악 Guitar' },
      { name: '이한범', school: '경희대학교', major: '포스트모던음악 Bass' },
      { name: '이우미', school: '경희대학교', major: '포스트모던음악 Vocal' },
      { name: '박경락', school: '서경대학교', major: 'Vocal' },
      { name: '임아람', school: '명지전문대학', major: 'Vocal' },
      { name: '김형도', school: '백석예술대학', major: 'Vocal' },
      { name: '최주희', school: '백석예술대학', major: 'Bass' },
      { name: '이한범', school: '백석예술대학', major: 'Bass' },
      { name: '이한범', school: '여주대학', major: 'Bass' },
      { name: '최주희', school: '여주대학', major: 'Bass' },
      { name: '임윤정', school: '여주대학', major: 'Musical Vocal' },
      { name: '이선애', school: '여주대학', major: 'Musical Vocal' },
      { name: '정윤희', school: '여주대학', major: 'Musical Vocal' },
      { name: '이정환', school: '경기대학교', major: '전자디지털음악 Composition' },
      { name: '정교연', school: '경기대학교', major: '전자디지털음악 Composition' },
      { name: '정교연', school: '호서대학교', major: 'SongWriting' },
      { name: '박지원', school: '호서대학교', major: 'Composition' },
      { name: '소민섭', school: '백제예술대학', major: 'Composition' },
      { name: '서인혜', school: '백제예술대학', major: 'Piano' },
      { name: '이한범', school: '백석대학교', major: 'Bass' },
      { name: '이현화', school: '청운대학교', major: 'Vocal' },
      { name: '지한솔', school: '백석문화대학', major: 'Midi' },
      { name: '손일호', school: '백석문화대학', major: 'Midi' },
      { name: '소민섭', school: '백석문화대학', major: 'Composition' },
      { name: '이수현', school: '재능대학', major: 'Piano' },
      { name: '최주희', school: '재능대학', major: 'Bass' },
      { name: '황수민', school: '재능대학', major: 'Composition' },
      { name: '이다솜', school: '칼빈대학교', major: 'Vocal' },
      { name: '정윤희', school: '중부대학교', major: 'Vocal' },
      { name: '박경락', school: '서경대학교', major: 'Vocal' },
      { name: '박지원', school: '추계예술대학', major: 'Piano' },
      { name: '유지혜', school: '서울공연예술고등학교', major: 'Vocal' },
    ],
  },
  '2010': {
    summary: '서울예대 외 35명',
    students: [
      { name: '정다미', school: '서울예술대학', major: 'Composition' },
      { name: '한규태', school: '서울예술대학', major: 'Vocal' },
      { name: '최규식', school: '동아방송예술대학', major: 'Bass' },
      { name: '양소영', school: '경희대학교', major: '포스트모던음악 Composition' },
      { name: '박설아', school: '경희대학교', major: '포스트모던음악 Composition' },
      { name: '김지원', school: '경희대학교', major: '포스트모던음악 Piano' },
      { name: '박슬아', school: '경희대학교', major: '포스트모던음악 Piano' },
      { name: '최지선', school: '동덕여자대학교', major: 'Trumpet' },
      { name: '박설아', school: '한양여자대학', major: 'Piano' },
      { name: '김유진', school: '명지대학교', major: 'Piano' },
      { name: '정다미', school: '호서대학교', major: 'Composition' },
      { name: '김영주', school: '호서대학교', major: 'Composition' },
      { name: '이용경', school: '호서대학교', major: 'Composition' },
      { name: '이용경', school: '경기대학교', major: '전자디지털음악 Composition' },
      { name: '김동관', school: '백제예술대학', major: 'Bass' },
      { name: '이나라', school: '백제예술대학', major: 'Piano' },
      { name: '정다미', school: '백제예술대학', major: 'Composition' },
      { name: '이용경', school: '백제예술대학', major: 'Composition' },
      { name: '박설아', school: '백제예술대학', major: 'Piano' },
      { name: '최규식', school: '백제예술대학', major: 'Bass' },
      { name: '김윤수', school: '백석대학교', major: 'Drums' },
      { name: '이소라', school: '백석문화대학', major: 'MIDI' },
      { name: '조재근', school: '평택대학교', major: 'Vocal' },
      { name: '윤예진', school: '평택대학교', major: 'Vocal' },
      { name: '김윤수', school: '재능대학', major: 'Drums' },
      { name: '민규원', school: '재능대학', major: 'Drums' },
      { name: '이나라', school: '재능대학', major: 'Piano' },
      { name: '이용경', school: '재능대학', major: 'Composition' },
      { name: '김영주', school: '재능대학', major: 'Composition' },
      { name: '이다미', school: '추계예술대학', major: 'Vocal' },
      { name: '김의영', school: '추계예술대학', major: 'Composition' },
      { name: '장은지', school: '추계예술대학', major: 'Composition' },
    ],
  },
  '2009': {
    summary: '서울예대 외 30명',
    students: [
      { name: '김남윤', school: '서울예술대학', major: 'Vocal' },
      { name: '강보라', school: '동아방송예술대학', major: 'Piano' },
      { name: '강보라', school: '경희대학교', major: '포스트모던음악 Piano' },
      { name: '정지은', school: '경희대학교', major: '포스트모던음악 Piano' },
      { name: '신동희', school: '명지전문대학', major: 'Vocal' },
      { name: '박설아', school: '호서대학교', major: 'Composition' },
      { name: '최지선', school: '호서대학교', major: 'Composition' },
      { name: '박설아', school: '백제예술대학', major: 'Composition' },
      { name: '양소영', school: '백제예술대학', major: 'Composition' },
      { name: '신성혜', school: '백제예술대학', major: 'Piano' },
      { name: '이행석', school: '백제예술대학', major: 'Vocal' },
      { name: '장혜연', school: '백제예술대학', major: '교회음악 Vocal' },
      { name: '김영주', school: '여주대학', major: 'Piano' },
      { name: '박헌구', school: '여주대학', major: 'Vocal' },
      { name: '유세희', school: '수원여자대학교', major: 'Vocal' },
      { name: '김영', school: '청운대학교', major: 'Piano' },
      { name: '한규만', school: '청운대학교', major: 'Guitar' },
      { name: '노유경', school: '한서대학교', major: 'Vocal' },
      { name: '오병준', school: '백석문화대학', major: 'Vocal' },
      { name: '이소연', school: '백석문화대학', major: 'Vocal' },
      { name: '남재숙', school: '숭실대학교', major: 'Vocal' },
      { name: '남재숙', school: '추계예술대학교', major: 'Vocal' },
      { name: '한은지', school: '추계예술대학교', major: 'Vocal' },
      { name: '조보경', school: '추계예술대학교', major: 'Vocal' },
      { name: '김현석', school: '공주영상대학', major: 'Vocal' },
      { name: '신성혜', school: '재능대학', major: 'Piano' },
      { name: '최지인', school: '김포대학', major: 'Guitar' },
      { name: '노유경', school: '경복대학', major: 'Vocal' },
    ],
  },
  '2008': {
    summary: '서울예대 외 25명',
    students: [
      { name: '박다나', school: '서울예술대학', major: '국악 판소리' },
      { name: '이서혜', school: '서울예술대학', major: 'Vocal' },
      { name: '김지윤', school: '서울예술대학', major: 'Composition' },
      { name: '김지윤', school: '동아방송예술대학', major: 'Composition' },
      { name: '이보연', school: '동아방송예술대학', major: 'Composition' },
      { name: '백솔희', school: '경희대학교', major: '포스트모던음악 Piano' },
      { name: '유동준', school: '경희대학교', major: '포스트모던음악 Drums' },
      { name: '백솔희', school: '동덕여자대학', major: 'Piano' },
      { name: '남재숙', school: '단국대학교', major: 'Vocal' },
      { name: '유근오', school: '호서대학교', major: 'Vocal' },
      { name: '김지윤', school: '여주대학', major: 'Composition 차석' },
      { name: '정혜라', school: '여주대학', major: 'Composition' },
      { name: '백솔희', school: '청운대학교', major: 'Piano 수석' },
      { name: '송현철', school: '숭실대학교', major: 'Bass 수석' },
      { name: '백호준', school: '중부대학교', major: 'Guitar' },
      { name: '유근오', school: '백석대학교', major: 'Vocal' },
      { name: '이수정', school: '백석문화대학', major: 'Guitar' },
      { name: '백호준', school: '서울종합예술학교', major: 'Guitar' },
      { name: '유성현', school: '김포대학', major: 'Vocal' },
      { name: '이수정', school: '김포대학', major: 'Guitar' },
    ],
  },
};

const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008'];

export default function ReviewsSection() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentData = admissionsByYear[selectedYear];

  // 이름 마스킹 함수 (중간 글자를 * 처리)
  const maskName = (name: string) => {
    if (name.length === 2) {
      return name[0] + '*';
    } else if (name.length >= 3) {
      return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
    }
    return name;
  };

  return (
    <section id="reviews" style={{ backgroundColor: '#000' }}>
      {/* Header */}
      <div style={{ padding: '100px 0 60px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: '#ffc50a',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              PRIDE OF K.H
            </p>
            <h2 style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '20px'
            }}>
              합격 실적
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px' }}>
              18년간 쌓아온 신뢰와 결과로 증명합니다
            </p>
          </div>
        </div>
      </div>

      {/* Year Selector Ticker */}
      <div style={{
        padding: '0',
        backgroundColor: '#ffc50a',
        overflow: 'hidden',
      }}>
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            animation: 'scrollYears 20s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {[...years, ...years, ...years].map((year, index) => (
            <button
              key={index}
              onClick={() => setSelectedYear(year)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '24px 48px',
                backgroundColor: selectedYear === year ? '#000' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}
            >
              <span style={{
                backgroundColor: selectedYear === year ? '#ffc50a' : '#000',
                color: selectedYear === year ? '#000' : '#ffc50a',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: 700,
              }}>
                {year}
              </span>
              <span style={{
                color: selectedYear === year ? '#fff' : '#000',
                fontSize: '16px',
                fontWeight: 600,
              }}>
                {admissionsByYear[year].summary}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Year Tabs (Static) */}
      <div style={{
        padding: '40px 0',
        backgroundColor: '#111',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                style={{
                  padding: '14px 28px',
                  backgroundColor: selectedYear === year ? '#ffc50a' : 'transparent',
                  border: selectedYear === year ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '100px',
                  color: selectedYear === year ? '#000' : '#fff',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                {year}년
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Admission List by Year */}
      <div style={{ padding: '80px 0' }}>
        <div className="container">
          {/* Year Title */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '12px',
            }}>
              {selectedYear}년 합격자
            </h3>
            <p style={{
              color: '#ffc50a',
              fontSize: '20px',
              fontWeight: 600,
            }}>
              {currentData.summary}
            </p>
          </div>

          {/* Student Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {currentData.students.map((student, index) => (
              <div
                key={index}
                style={{
                  padding: '24px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ffc50a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <p style={{
                    color: '#fff',
                    fontSize: '17px',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    {maskName(student.name)}
                  </p>
                  <p style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '14px',
                  }}>
                    {student.school} · {student.major}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link
              href="/admissions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 40px',
                backgroundColor: '#ffc50a',
                borderRadius: '100px',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 700,
                transition: 'transform 0.2s',
              }}
            >
              전체 합격생 명단 보기
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollYears {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
