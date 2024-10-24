import {
  Truck, // 배송/운송 아이콘
  Users, // 사용자 그룹 아이콘
  Calendar, // 캘린더 아이콘
  TrendingUp, // 상승 그래프 아이콘
  List, // 리스트 아이콘
  ListPlus, // 플러스 아이콘
  Settings, // 설정 아이콘
  Menu, // 메뉴 아이콘
  ChevronDown, // 아래 화살표 아이콘
} from 'lucide-react';
export const sideBarMenuData = {
  engineer: {
    title: '기사님 관리',
    icon: Truck,
    links: [
      {
        name: '리스트 보기',
        href: '/engineer/e_list',
        icon: List,
      },
      {
        name: '등록하기',
        href: '/engineer/e_register',
        icon: ListPlus,
      },
      { name: '수정하기', href: '/engineer/e_modify', icon: Settings },
    ],
  },
  member: {
    title: '회원 관리',
    icon: Users,
    links: [
      {
        name: '리스트 보기',
        href: '/customers/c_list',
        icon: List,
      },
      {
        name: '예약하기',
        href: '/customers/c_register',
        icon: ListPlus,
      },
      { name: '수정하기', href: '/customers/c_modify', icon: Settings },
    ],
  },
  schedule: {
    title: '스케줄',
    icon: Calendar,
    links: [
      {
        name: '리스트 보기',
        href: '/schedule/s_list',
        icon: List,
      },
      { name: '등록하기', href: '/schedule/s_register', icon: ListPlus },
      { name: '수정하기', href: '/schedule/s_modify', icon: Settings },
    ],
  },
  sales: {
    title: '매출 관리',
    icon: TrendingUp,
    links: [
      {
        name: '일자별 매출',
        href: '/sales/daily',
        icon: List,
      },
      { name: '주간 매출', href: '/sales/weekly', icon: ListPlus },
      { name: '월별 매출', href: '/sales/monthly', icon: Settings },
    ],
  },
};
