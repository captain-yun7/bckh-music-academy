'use client';

import { useState, useEffect } from 'react';
import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// 강사 상세 데이터 타입
interface InstructorDetail {
  name: string;
  image: string;
  introduction: string;
  profile: string;
  curriculum: { title: string; content: string }[];
  genres: string;
  recommendations: string[];
  message: string;
  videos?: string[]; // YouTube video IDs
}

// 전공별 강사 데이터 (상세 정보 포함)
const instructorsData: Record<string, {
  title: string;
  subtitle: string;
  instructors: InstructorDetail[];
}> = {
  'vocal': {
    title: '보컬',
    subtitle: '대중음악 보컬 전문 교육',
    instructors: [
      {
        name: '하수지',
        image: '/images/lecturers/vocal_하수지.jpeg',
        introduction: '안녕하세요. 보컬트레이너 겸 싱어송라이터 하수지입니다.',
        profile: '백석예대 실용음악학과 싱어송라이터 전공',
        curriculum: [
          {
            title: '학생의 결을 이해하는 보컬 티칭',
            content: '저는 사람의 어린시절, 성격, 말투, 감정의 결이 그대로 노래에 드러난다고 믿습니다. 그래서 소리를 교정하기보다, 학생 고유의 결을 이해하고 그 색을 살려주는 교육을 지향합니다. 발성 기술과 표현력은 물론, 학생이 스스로 자신의 장점을 발견하고 표현할 수 있도록 돕는 것이 제 수업의 핵심입니다.'
          },
          {
            title: '탄탄한 기본기 + 창의적 해석',
            content: '호흡·자세·발성 기초를 통해 안정된 기반을 세우고, 그 위에 학생만의 개성과 정서를 담은 소리를 만들어갑니다. 싱어송라이터로서 기존 곡을 학생의 톤·기량·음역대에 맞게 재해석해주는 수업이 가능하며, 연주와 보컬을 병행한 지도, 곡 해석·프레이징·스타일링을 통해 학생의 음악적 방향성을 확립하도록 돕습니다.'
          },
          {
            title: '자작곡·레코딩 중심의 실전형 성장',
            content: '요즘 보컬에게 자작곡은 중요한 자기 표현 도구이기에, 작사·작곡 방향 설정과 멜로디 구성, 표현 방식 등 창작 전반의 방향성을 함께 잡아갑니다. 또한 정기적인 레코딩 수업을 통해 학생이 자신의 소리를 객관적으로 듣고 점검하며 성장할 수 있는 경험을 제공합니다.'
          }
        ],
        genres: 'Rock, R&B, Funk, J-pop, Indie, Pop',
        recommendations: [
          'Kara Marni - Caught up',
          'Sarah Evelyn - Half Is Not Enough',
          'Nao - Bad Blood',
          '전지선 - Help',
          '까치산 - 주제는 사랑'
        ],
        message: '각자의 목소리와 개성이 가장 편안하게 빛날 수 있도록 돕겠습니다.',
        videos: ['dQw4w9WgXcQ', 'L_jWHffIx5E'] // 예시 YouTube IDs
      },
      {
        name: '김수현',
        image: '/images/lecturers/vocal_김수현.jpeg',
        introduction: '안녕하세요. K-POP 보컬 트레이너 김수현입니다.',
        profile: '경희대학교 포스트모던음악학과 졸업',
        curriculum: [
          {
            title: '체계적인 발성 교육',
            content: '복식호흡부터 두성, 믹스보이스까지 체계적인 발성 테크닉을 가르칩니다. 학생 개개인의 음역대와 음색에 맞는 맞춤형 커리큘럼을 제공합니다.'
          },
          {
            title: 'K-POP 스타일링',
            content: '아이돌 보컬 트레이닝 경험을 바탕으로 K-POP에 최적화된 보컬 스타일링을 지도합니다. 음원과 라이브에서 모두 빛날 수 있는 보컬리스트로 성장시킵니다.'
          }
        ],
        genres: 'K-POP, R&B, Ballad, Dance Pop',
        recommendations: [
          'Ariana Grande - Into You',
          'Beyoncé - Love On Top',
          '태연 - Fine',
          'IU - 에잇'
        ],
        message: '여러분의 숨겨진 가능성을 함께 발견해 나가요!',
        videos: []
      },
      {
        name: '김한울',
        image: '/images/lecturers/vocal_김한울.jpg',
        introduction: '안녕하세요. 세션보컬 겸 보컬트레이너 김한울입니다.',
        profile: '동아방송예술대학교 실용음악과 졸업, 버클리 음대 보컬 워크샵 수료',
        curriculum: [
          {
            title: '라이브 퍼포먼스 중심 교육',
            content: '무대 위에서 빛나는 보컬리스트가 되기 위한 라이브 퍼포먼스 중심의 수업을 진행합니다. 마이크 테크닉, 무대 매너, 청중과의 소통법까지 종합적으로 지도합니다.'
          },
          {
            title: '코러스 하모니 트레이닝',
            content: '다양한 아티스트들과의 코러스 세션 경험을 바탕으로 하모니 감각과 앙상블 능력을 키워드립니다.'
          }
        ],
        genres: 'Soul, R&B, Gospel, Pop',
        recommendations: [
          'Stevie Wonder - Superstition',
          'Whitney Houston - I Wanna Dance With Somebody',
          'Bruno Mars - Uptown Funk'
        ],
        message: '함께 음악으로 소통하며 성장해요!',
        videos: []
      },
      {
        name: '이은지',
        image: '/images/lecturers/vocal_이은지.jpg',
        introduction: '안녕하세요. 발라드 보컬 전문 트레이너 이은지입니다.',
        profile: '서울예술대학교 실용음악과 졸업',
        curriculum: [
          {
            title: '감성 보컬 트레이닝',
            content: '발라드의 핵심은 감정 전달입니다. 기본 발성을 바탕으로 곡의 감정을 온전히 전달할 수 있는 표현력을 키워드립니다.'
          },
          {
            title: '입시 맞춤 커리큘럼',
            content: '15년 입시 경력을 바탕으로 각 대학별 입시 특성에 맞는 맞춤형 레슨을 제공합니다.'
          }
        ],
        genres: 'Ballad, Pop, OST',
        recommendations: [
          '백예린 - 그건 아마 우리의 잘못은 아닐 거야',
          '폴킴 - 모든 날, 모든 순간',
          '아이유 - 밤편지'
        ],
        message: '당신의 목소리로 감동을 전할 수 있도록 함께 하겠습니다.',
        videos: []
      },
      {
        name: '전용일',
        image: '/images/lecturers/vocal_전용일.jpg',
        introduction: '안녕하세요. 아이돌 보컬 트레이너 전용일입니다.',
        profile: '단국대학교 실용음악과 졸업, YG엔터테인먼트 트레이너 출신',
        curriculum: [
          {
            title: '아이돌 맞춤 보컬 트레이닝',
            content: '댄스와 보컬을 동시에 소화해야 하는 아이돌 지망생을 위한 특화 수업입니다. 체력 안배와 호흡 관리를 중점적으로 다룹니다.'
          },
          {
            title: '그룹 하모니 수업',
            content: '그룹 활동을 목표로 하는 학생들을 위한 파트 배분과 하모니 수업을 진행합니다.'
          }
        ],
        genres: 'K-POP, Hip-Hop, R&B, EDM',
        recommendations: [
          'BIGBANG - BANG BANG BANG',
          'WINNER - Really Really',
          'BTS - Dynamite'
        ],
        message: '꿈을 향해 달려가는 여러분을 응원합니다!',
        videos: []
      },
      {
        name: '홍연하',
        image: '/images/lecturers/vocal_홍연하.png',
        introduction: '안녕하세요. 퓨전국악 보컬 전문 홍연하입니다.',
        profile: '호원대학교 실용음악과 졸업',
        curriculum: [
          {
            title: '국악 창법과 실용음악의 융합',
            content: '전통 국악 창법을 현대 실용음악에 접목시키는 독특한 수업을 진행합니다. 기존에 없던 새로운 음색을 만들어갑니다.'
          },
          {
            title: '발성의 다양화',
            content: '다양한 발성 기법을 통해 학생만의 유니크한 보컬 스타일을 개발합니다.'
          }
        ],
        genres: '퓨전국악, World Music, Folk, Indie',
        recommendations: [
          '이날치 - 범 내려온다',
          '잠비나이 - Connection',
          '씽씽 - 소리'
        ],
        message: '전통과 현대의 조화로운 소리를 함께 만들어가요.',
        videos: []
      },
      {
        name: '홍효진',
        image: '/images/lecturers/vocal_홍효진.png',
        introduction: '안녕하세요. 뮤지컬 보컬 전문 트레이너 홍효진입니다.',
        profile: '명지대학교 음악학과 졸업',
        curriculum: [
          {
            title: '뮤지컬 보컬 기초',
            content: '클래식 발성을 기반으로 한 뮤지컬 특화 보컬 트레이닝을 진행합니다. 마이크 없이도 극장을 울릴 수 있는 성량을 만들어갑니다.'
          },
          {
            title: '연기와 노래의 융합',
            content: '뮤지컬에서 가장 중요한 것은 노래를 통한 연기입니다. 캐릭터 분석부터 감정 표현까지 종합적으로 지도합니다.'
          }
        ],
        genres: 'Musical, Classical Crossover, Pop Opera',
        recommendations: [
          'Les Misérables - I Dreamed a Dream',
          'The Phantom of the Opera - Music of the Night',
          'Chicago - All That Jazz'
        ],
        message: '무대 위에서 빛나는 뮤지컬 배우가 되실 수 있도록 돕겠습니다.',
        videos: []
      },
    ],
  },
  'composing': {
    title: '작곡/화성학',
    subtitle: '작곡 및 화성학 이론 전문 교육',
    instructors: [
      {
        name: '강혜민',
        image: '/images/lecturers/composing_강혜민.jpg',
        introduction: '안녕하세요. 작곡가 겸 프로듀서 강혜민입니다.',
        profile: '버클리 음대 작곡전공 졸업',
        curriculum: [
          {
            title: 'K-POP 작곡의 기초',
            content: 'K-POP 특유의 후킹 멜로디와 구조를 분석하고, 직접 작곡해보는 실습 위주의 수업을 진행합니다.'
          },
          {
            title: '프로듀싱 워크플로우',
            content: '아이디어 스케치부터 최종 믹싱까지, 실제 프로듀싱 과정을 경험할 수 있습니다.'
          }
        ],
        genres: 'K-POP, Pop, R&B, Electronic',
        recommendations: [
          'EXO - Love Shot',
          'NCT 127 - Kick It',
          'Red Velvet - Psycho'
        ],
        message: '여러분의 음악적 아이디어를 현실로 만들어 드립니다.',
        videos: []
      },
      {
        name: '이재혁',
        image: '/images/lecturers/composing_이재혁.jpg',
        introduction: '안녕하세요. 광고음악 작곡가 이재혁입니다.',
        profile: '경희대학교 포스트모던음악학과 졸업',
        curriculum: [
          {
            title: '상업음악 작곡',
            content: '광고, 영상, 게임 등 다양한 매체에 맞는 음악을 작곡하는 방법을 배웁니다.'
          },
          {
            title: '화성학 기초부터 심화까지',
            content: '실용음악 입시에 필요한 화성학을 체계적으로 정리해드립니다.'
          }
        ],
        genres: 'Commercial, OST, Electronic, Pop',
        recommendations: [
          '영화 "기생충" OST',
          '드라마 "도깨비" OST',
          '삼성 갤럭시 광고음악'
        ],
        message: '음악으로 이야기하는 법을 함께 배워봐요.',
        videos: []
      },
      {
        name: '이은비',
        image: '/images/lecturers/composing_이은비.jpg',
        introduction: '안녕하세요. 클래식 작곡가 이은비입니다.',
        profile: '한양대학교 작곡과 졸업',
        curriculum: [
          {
            title: '클래식 화성학',
            content: '바흐부터 현대음악까지, 클래식 화성학의 전 과정을 체계적으로 학습합니다.'
          },
          {
            title: '오케스트레이션',
            content: '다양한 악기의 특성을 이해하고 오케스트라 편곡을 배웁니다.'
          }
        ],
        genres: 'Classical, Contemporary, Film Score',
        recommendations: [
          'Debussy - Clair de Lune',
          'Ravel - Bolero',
          'John Williams - Star Wars Theme'
        ],
        message: '음악 이론의 깊이를 함께 탐구해봐요.',
        videos: []
      },
      {
        name: '황진하',
        image: '/images/lecturers/composing_황진하.jpg',
        introduction: '안녕하세요. 재즈 피아니스트 겸 화성학 전문강사 황진하입니다.',
        profile: '단국대학교 실용음악과 졸업',
        curriculum: [
          {
            title: '재즈 화성학',
            content: '재즈 특유의 텐션 코드와 보이싱을 체계적으로 학습합니다.'
          },
          {
            title: '입시 화성학 완성',
            content: '실용음악 입시에 필요한 화성학을 10년 경력의 노하우로 정리해드립니다.'
          }
        ],
        genres: 'Jazz, Fusion, Contemporary',
        recommendations: [
          'Bill Evans - Waltz for Debby',
          'Chick Corea - Spain',
          'Keith Jarrett - The Köln Concert'
        ],
        message: '화성학은 음악의 언어입니다. 함께 마스터해요.',
        videos: []
      },
    ],
  },
  'midi': {
    title: '미디/전자음악',
    subtitle: 'MIDI 및 전자음악 프로덕션 교육',
    instructors: [
      {
        name: '이재혁',
        image: '/images/lecturers/midi_이재혁.jpg',
        introduction: '안녕하세요. 전자음악 프로듀서 이재혁입니다.',
        profile: '경희대학교 포스트모던음악학과 졸업',
        curriculum: [
          {
            title: 'DAW 마스터',
            content: 'Logic Pro, Ableton Live를 활용한 음악 제작의 A to Z를 배웁니다.'
          },
          {
            title: '사운드 디자인',
            content: '신디사이저의 원리를 이해하고 나만의 사운드를 만드는 방법을 배웁니다.'
          }
        ],
        genres: 'Electronic, EDM, Ambient, Experimental',
        recommendations: [
          'Daft Punk - Around the World',
          'Deadmau5 - Strobe',
          'Aphex Twin - Xtal'
        ],
        message: '기술과 창의성의 조화로 여러분만의 사운드를 만들어봐요.',
        videos: []
      },
      {
        name: '조윤상',
        image: '/images/lecturers/midi_조윤상.jpg',
        introduction: '안녕하세요. EDM 프로듀서 겸 DJ 조윤상입니다.',
        profile: '서울예술대학교 실용음악과 졸업',
        curriculum: [
          {
            title: 'EDM 프로덕션',
            content: 'House, Techno, Dubstep 등 다양한 EDM 장르의 제작 기법을 배웁니다.'
          },
          {
            title: 'DJ 퍼포먼스',
            content: '믹싱, 스크래칭, 라이브 리믹스 등 DJ 테크닉을 배웁니다.'
          }
        ],
        genres: 'EDM, House, Techno, Bass Music',
        recommendations: [
          'Skrillex - Bangarang',
          'Martin Garrix - Animals',
          'Calvin Harris - Summer'
        ],
        message: '클럽을 뒤흔들 트랙을 함께 만들어봐요!',
        videos: []
      },
    ],
  },
  'singer-songwriter': {
    title: '싱어송라이터',
    subtitle: '보컬과 작곡을 겸비한 아티스트 양성',
    instructors: [
      {
        name: '하수지',
        image: '/images/lecturers/vocal_하수지.jpeg',
        introduction: '안녕하세요. 보컬트레이너 겸 싱어송라이터 하수지입니다.',
        profile: '백석예대 실용음악학과 싱어송라이터 전공',
        curriculum: [
          {
            title: '학생의 결을 이해하는 보컬 티칭',
            content: '저는 사람의 어린시절, 성격, 말투, 감정의 결이 그대로 노래에 드러난다고 믿습니다. 그래서 소리를 교정하기보다, 학생 고유의 결을 이해하고 그 색을 살려주는 교육을 지향합니다.'
          },
          {
            title: '자작곡 창작 지도',
            content: '작사·작곡 방향 설정과 멜로디 구성, 표현 방식 등 창작 전반의 방향성을 함께 잡아갑니다.'
          }
        ],
        genres: 'Rock, R&B, Funk, J-pop, Indie, Pop',
        recommendations: [
          'Kara Marni - Caught up',
          'Sarah Evelyn - Half Is Not Enough',
          'Nao - Bad Blood'
        ],
        message: '각자의 목소리와 개성이 가장 편안하게 빛날 수 있도록 돕겠습니다.',
        videos: []
      },
      {
        name: '강혜민',
        image: '/images/lecturers/composing_강혜민.jpg',
        introduction: '안녕하세요. 싱어송라이터 겸 프로듀서 강혜민입니다.',
        profile: '버클리 음대 작곡전공 졸업',
        curriculum: [
          {
            title: '자작곡 멘토링',
            content: '곡의 아이디어 단계부터 완성까지 1:1 멘토링을 통해 함께 만들어갑니다.'
          },
          {
            title: '셀프 프로듀싱',
            content: '자신의 곡을 직접 녹음하고 편곡하는 셀프 프로듀싱 기법을 배웁니다.'
          }
        ],
        genres: 'Pop, Indie, R&B, Acoustic',
        recommendations: [
          '백예린 - 0310',
          '검정치마 - 나랑 아니면',
          'Billie Eilish - When The Party\'s Over'
        ],
        message: '당신만의 이야기를 음악으로 표현해봐요.',
        videos: []
      },
    ],
  },
  'guitar': {
    title: '기타',
    subtitle: '일렉기타, 어쿠스틱기타 전문 교육',
    instructors: [
      {
        name: '노아(Noah)',
        image: '/images/lecturers/guitar_노아.jpg',
        introduction: '안녕하세요. 세션 기타리스트 Noah입니다.',
        profile: 'Musicians Institute(MI) 졸업',
        curriculum: [
          { title: '일렉기타 테크닉', content: '펜타토닉부터 모드까지, 일렉기타의 핵심 테크닉을 체계적으로 배웁니다.' },
          { title: '세션 기타 실습', content: '실제 세션 현장에서 필요한 스킬과 노하우를 전수합니다.' }
        ],
        genres: 'Rock, Blues, Fusion, Pop',
        recommendations: ['Jimi Hendrix - Voodoo Child', 'Steve Vai - For The Love of God'],
        message: '기타와 함께하는 음악 여행을 시작해봐요!',
        videos: []
      },
      {
        name: '김영롱',
        image: '/images/lecturers/guitar_김영롱.jpg',
        introduction: '안녕하세요. 핑거스타일 기타리스트 김영롱입니다.',
        profile: '동아방송예술대학교 실용음악과 졸업',
        curriculum: [
          { title: '핑거스타일 기초', content: '어쿠스틱 기타의 매력을 핑거스타일로 표현하는 방법을 배웁니다.' }
        ],
        genres: 'Fingerstyle, Acoustic, Folk',
        recommendations: ['Sungha Jung - Felicity', 'Tommy Emmanuel - Mombasa'],
        message: '손끝으로 전하는 감성, 함께 만들어요.',
        videos: []
      },
      {
        name: '남윤찬',
        image: '/images/lecturers/guitar_남윤찬.jpg',
        introduction: '안녕하세요. 재즈 기타리스트 남윤찬입니다.',
        profile: '백제예술대학교 실용음악과 졸업',
        curriculum: [
          { title: '재즈 기타 입문', content: '재즈 기타의 기초부터 즉흥연주까지 체계적으로 배웁니다.' }
        ],
        genres: 'Jazz, Fusion, Bossa Nova',
        recommendations: ['Wes Montgomery - Four on Six', 'Pat Metheny - Bright Size Life'],
        message: '재즈의 세계로 함께 떠나봐요.',
        videos: []
      },
      {
        name: '공석배',
        image: '/images/lecturers/guitar_공석배.jpg',
        introduction: '안녕하세요. 록/메탈 기타리스트 공석배입니다.',
        profile: '경희대학교 포스트모던음악학과 졸업',
        curriculum: [
          { title: '록/메탈 테크닉', content: '파워코드부터 속주까지, 록과 메탈의 핵심 테크닉을 배웁니다.' }
        ],
        genres: 'Rock, Metal, Hard Rock',
        recommendations: ['Metallica - Master of Puppets', 'Van Halen - Eruption'],
        message: '강렬한 사운드로 무대를 장악하세요!',
        videos: []
      },
      {
        name: '구자훈',
        image: '/images/lecturers/guitar_구자훈.png',
        introduction: '안녕하세요. 클래식 기타리스트 구자훈입니다.',
        profile: '호원대학교 실용음악과 졸업',
        curriculum: [
          { title: '클래식 기타 기초', content: '바른 자세와 기본 테크닉부터 탄탄하게 쌓아갑니다.' }
        ],
        genres: 'Classical, Fingerstyle',
        recommendations: ['Francisco Tárrega - Recuerdos de la Alhambra'],
        message: '클래식 기타의 아름다움을 함께 경험해요.',
        videos: []
      },
    ],
  },
  'bass': {
    title: '베이스',
    subtitle: '일렉베이스 전문 교육',
    instructors: [
      {
        name: '현재천',
        image: '/images/lecturers/bass_현재천.jpg',
        introduction: '안녕하세요. 재즈 베이시스트 현재천입니다.',
        profile: '서울예술대학교 실용음악과 졸업',
        curriculum: [
          { title: '재즈 베이스', content: '워킹베이스와 재즈 그루브의 핵심을 배웁니다.' },
          { title: '슬랩 테크닉', content: '펑키한 슬랩 베이스 테크닉을 마스터합니다.' }
        ],
        genres: 'Jazz, Fusion, Funk',
        recommendations: ['Jaco Pastorius - Portrait of Tracy', 'Marcus Miller - Blast'],
        message: '밴드의 심장, 베이스의 매력을 느껴보세요.',
        videos: []
      },
      {
        name: '신희주',
        image: '/images/lecturers/bass_신희주.png',
        introduction: '안녕하세요. R&B 베이시스트 신희주입니다.',
        profile: '동아방송예술대학교 실용음악과 졸업',
        curriculum: [
          { title: 'R&B/Funk 그루브', content: '리듬감 있는 R&B와 Funk 베이스 라인을 배웁니다.' }
        ],
        genres: 'R&B, Funk, Pop, K-POP',
        recommendations: ['Earth, Wind & Fire - September', 'Bruno Mars - Locked Out of Heaven'],
        message: '그루브한 베이스로 음악에 생명을 불어넣어요.',
        videos: []
      },
    ],
  },
  'drums': {
    title: '드럼',
    subtitle: '드럼 전문 교육',
    instructors: [
      {
        name: '유종광',
        image: '/images/lecturers/drums_유종광.jpeg',
        introduction: '안녕하세요. 재즈 드러머 유종광입니다.',
        profile: '경희대학교 포스트모던음악학과 졸업',
        curriculum: [
          { title: '재즈/퓨전 드럼', content: '스윙 리듬부터 퓨전 그루브까지 체계적으로 배웁니다.' },
          { title: '세션 드럼 실습', content: '다양한 장르의 세션에서 필요한 드럼 테크닉을 익힙니다.' }
        ],
        genres: 'Jazz, Fusion, Pop, Rock',
        recommendations: ['Dave Weckl - Tower of Inspiration', 'Vinnie Colaiuta - I\'m Tweeked'],
        message: '리듬의 세계로 함께 빠져봐요!',
        videos: []
      },
    ],
  },
  'jazz-piano': {
    title: '재즈피아노',
    subtitle: '재즈피아노 및 건반 전문 교육',
    instructors: [
      {
        name: '이민경',
        image: '/images/lecturers/piano_이민경.jpg',
        introduction: '안녕하세요. 재즈 피아니스트 이민경입니다.',
        profile: '버클리 음대 재즈피아노 전공',
        curriculum: [
          { title: '재즈피아노 입문', content: '재즈 보이싱과 즉흥연주의 기초를 배웁니다.' }
        ],
        genres: 'Jazz, Bossa Nova, Fusion',
        recommendations: ['Bill Evans - My Foolish Heart', 'Herbie Hancock - Cantaloupe Island'],
        message: '재즈의 자유로움을 피아노로 표현해봐요.',
        videos: []
      },
      {
        name: '이소정',
        image: '/images/lecturers/piano_이소정.jpg',
        introduction: '안녕하세요. 피아니스트 이소정입니다.',
        profile: '한양대학교 음악대학원 졸업',
        curriculum: [
          { title: '반주법', content: '다양한 장르의 반주법을 체계적으로 배웁니다.' }
        ],
        genres: 'Classical, Jazz, Pop',
        recommendations: ['Chopin - Ballade No.1', 'Oscar Peterson - C Jam Blues'],
        message: '클래식과 재즈를 넘나드는 피아노를 경험해보세요.',
        videos: []
      },
      {
        name: '김하영',
        image: '/images/lecturers/piano_김하영.png',
        introduction: '안녕하세요. 가요 반주 전문 김하영입니다.',
        profile: '경희대학교 포스트모던음악학과 졸업',
        curriculum: [
          { title: '실용 반주법', content: 'K-POP과 가요 반주의 핵심을 배웁니다.' }
        ],
        genres: 'K-POP, Ballad, Pop',
        recommendations: ['IU - 밤편지', '폴킴 - 모든 날, 모든 순간'],
        message: '노래를 더 빛나게 하는 반주를 만들어봐요.',
        videos: []
      },
      {
        name: '황진하',
        image: '/images/lecturers/piano_황진하.jpg',
        introduction: '안녕하세요. 재즈 피아니스트 황진하입니다.',
        profile: '단국대학교 실용음악과 졸업',
        curriculum: [
          { title: '재즈 화성학/피아노', content: '재즈 화성학과 피아노를 동시에 배웁니다.' }
        ],
        genres: 'Jazz, Fusion, Contemporary',
        recommendations: ['Chick Corea - Spain', 'Keith Jarrett - The Köln Concert'],
        message: '화성학과 피아노, 두 마리 토끼를 잡아봐요.',
        videos: []
      },
      {
        name: '구자경',
        image: '/images/lecturers/piano_구자경.png',
        introduction: '안녕하세요. CCM 피아니스트 구자경입니다.',
        profile: '서울예술대학교 실용음악과 졸업',
        curriculum: [
          { title: '가스펠/CCM 반주', content: '교회 찬양 반주의 기초부터 심화까지 배웁니다.' }
        ],
        genres: 'Gospel, CCM, Worship',
        recommendations: ['Hillsong - Oceans', 'Bethel Music - Goodness of God'],
        message: '찬양으로 마음을 전하는 반주를 배워봐요.',
        videos: []
      },
      {
        name: '박한빈',
        image: '/images/lecturers/piano_박한빈.jpeg',
        introduction: '안녕하세요. 뉴에이지 피아니스트 박한빈입니다.',
        profile: '동아방송예술대학교 실용음악과 졸업',
        curriculum: [
          { title: '뉴에이지/팝 피아노', content: '감성적인 뉴에이지와 팝 피아노를 배웁니다.' }
        ],
        genres: 'New Age, Pop, Ballad',
        recommendations: ['Yiruma - River Flows in You', '이루마 - Kiss The Rain'],
        message: '피아노로 감성을 표현하는 법을 배워봐요.',
        videos: []
      },
    ],
  },
  'dance': {
    title: '댄스',
    subtitle: '무대 퍼포먼스 및 댄스 교육',
    instructors: [
      {
        name: '양지은',
        image: '/images/lecturers/dance_양지은.jpeg',
        introduction: '안녕하세요. K-POP 안무가 양지은입니다.',
        profile: '한국예술종합학교 무용과 졸업, SM엔터테인먼트 퍼포먼스 디렉터',
        curriculum: [
          { title: 'K-POP 댄스', content: '아이돌 안무의 기초부터 고급 테크닉까지 배웁니다.' },
          { title: '무대 퍼포먼스', content: '표정, 시선, 무대 매너 등 종합적인 퍼포먼스를 지도합니다.' }
        ],
        genres: 'K-POP, Hip-Hop, Contemporary',
        recommendations: ['EXO - Monster', 'Red Velvet - Bad Boy', 'aespa - Next Level'],
        message: '무대 위에서 빛나는 퍼포머가 되어보세요!',
        videos: []
      },
    ],
  },
};

const subjectOrder = ['vocal', 'composing', 'midi', 'singer-songwriter', 'guitar', 'bass', 'drums', 'jazz-piano', 'dance'];

// 모달 컴포넌트
function InstructorModal({
  instructor,
  subject,
  onClose
}: {
  instructor: InstructorDetail | null;
  subject: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (instructor) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [instructor]);

  if (!instructor) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '40px 20px',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          maxWidth: '900px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header with small image */}
        <div style={{
          padding: '32px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '3px solid #ffc50a',
          }}>
            <Image
              src={instructor.image}
              alt={instructor.name}
              width={100}
              height={100}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          <div>
            <span style={{
              display: 'inline-block',
              backgroundColor: '#ffc50a',
              color: '#000',
              padding: '4px 12px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '8px',
            }}>
              {subject} 전공
            </span>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>
              {instructor.name}
            </h3>
            <p style={{ fontSize: '14px', color: '#666' }}>{instructor.profile}</p>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* 자기소개 */}
          <Section title="자기소개">
            <p style={{ fontSize: '15px', color: '#333', lineHeight: 1.8 }}>
              {instructor.introduction}
            </p>
          </Section>

          {/* 커리큘럼 */}
          <Section title="커리큘럼">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {instructor.curriculum.map((item, index) => (
                <div key={index}>
                  <h5 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#000',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#ffc50a',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 700,
                    }}>
                      {index + 1}
                    </span>
                    {item.title}
                  </h5>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.8, paddingLeft: '32px' }}>
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* 영상 2개 (있는 경우) */}
          {instructor.videos && instructor.videos.length > 0 && (
            <Section title="강사 영상">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}>
                {instructor.videos.slice(0, 2).map((videoId, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      aspectRatio: '16/9',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#000',
                    }}
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`강사 영상 ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  </div>
                ))}
                {/* 영상이 1개만 있을 경우 빈 공간 */}
                {instructor.videos.length === 1 && (
                  <div style={{
                    aspectRatio: '16/9',
                    borderRadius: '12px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '14px',
                  }}>
                    영상 준비중
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* 추구하는 음악장르 & 추천음반 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Section title="추구하는 음악장르" noBorder>
              <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.8 }}>
                {instructor.genres}
              </p>
            </Section>
            <Section title="추천음반리스트" noBorder>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {instructor.recommendations.map((item, index) => (
                  <li key={index} style={{
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{ color: '#ffc50a' }}>♪</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* 레슨생분들께 드리는 말씀 */}
          <div style={{
            marginTop: '32px',
            padding: '32px',
            backgroundColor: '#111',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* 데코 라인 */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              backgroundColor: '#ffc50a',
            }} />
            {/* 큰따옴표 장식 */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '24px',
              fontSize: '80px',
              fontFamily: 'Georgia, serif',
              color: 'rgba(255,197,10,0.15)',
              lineHeight: 1,
            }}>
              &rdquo;
            </div>
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#ffc50a',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}>
              Message
            </p>
            <p style={{
              fontSize: '18px',
              color: '#fff',
              lineHeight: 1.8,
              fontWeight: 400,
              position: 'relative',
              zIndex: 1,
            }}>
              {instructor.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 섹션 컴포넌트
function Section({ title, children, noBorder = false }: { title: string; children: React.ReactNode; noBorder?: boolean }) {
  return (
    <div style={{
      marginBottom: noBorder ? 0 : '28px',
      paddingBottom: noBorder ? 0 : '28px',
      borderBottom: noBorder ? 'none' : '1px solid #eee',
    }}>
      <h4 style={{
        fontSize: '13px',
        fontWeight: 600,
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '12px',
      }}>
        · {title}
      </h4>
      {children}
    </div>
  );
}

export default function InstructorSubjectPage() {
  const params = useParams();
  const subject = params.subject as string;
  const data = instructorsData[subject];
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorDetail | null>(null);

  if (!data) {
    return null;
  }

  const currentIndex = subjectOrder.indexOf(subject);
  const prevSubject = currentIndex > 0 ? subjectOrder[currentIndex - 1] : null;
  const nextSubject = currentIndex < subjectOrder.length - 1 ? subjectOrder[currentIndex + 1] : null;

  return (
    <SubPageLayout
      title={data.title}
      subtitle={data.subtitle}
      bgImage="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1920&q=80"
    >
      {/* Breadcrumb */}
      <section style={{ padding: '24px 0', backgroundColor: '#f8f8f8', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
            <Link href="/instructors" style={{ color: '#3b82f6', textDecoration: 'none' }}>
              강사진
            </Link>
            <span>/</span>
            <span style={{ color: '#000', fontWeight: 500 }}>{data.title}</span>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px',
          }}>
            {data.instructors.map((instructor, index) => (
              <div
                key={index}
                onClick={() => setSelectedInstructor(instructor)}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#f8f8f8',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Hover Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#ffc50a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#000',
                    marginBottom: '8px',
                  }}>
                    {instructor.name}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#3b82f6',
                    fontWeight: 500,
                  }}>
                    {data.title} 전공
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: '#999',
                    marginTop: '8px',
                  }}>
                    클릭하여 상세정보 보기
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section style={{ padding: '40px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {prevSubject ? (
              <Link
                href={`/instructors/${prevSubject}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {instructorsData[prevSubject].title}
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/instructors"
              style={{
                padding: '12px 24px',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              전체 강사진 보기
            </Link>

            {nextSubject ? (
              <Link
                href={`/instructors/${nextSubject}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                }}
              >
                {instructorsData[nextSubject].title}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <InstructorModal
        instructor={selectedInstructor}
        subject={data.title}
        onClose={() => setSelectedInstructor(null)}
      />
    </SubPageLayout>
  );
}
