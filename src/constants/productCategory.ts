import { airConditionerCategory, washingMachineCategory } from './textType';

type Product = {
  category?: airConditionerCategory | washingMachineCategory;
  price?: number | null;
}

type ProductCategory = {
  product: '에어컨' | '세탁기'
  categories: Product[];
};

type ProductCategoryProps = {
  airConditioner: ProductCategory;
  washingMachine: ProductCategory;
}

export const productCategories: ProductCategoryProps  = {
  airConditioner: {
    product: '에어컨',
    categories: [
      {
        category: '벽걸이',
        price: 90000,
      },
      {
        category: '원웨이',
        price: 100000,
      },
      {
        category: '포웨이',
        price: 130000,
      },
      {
        category: '스탠드', // 12만~16만
        price: 0,
      },
      {
        category: '투인원', // 18만~23만
        price: 0,
      },
      {
        category: '원형 360',
        price: 180000,
      },
      {
        category: '파세코 창문형',
        price: 170000,
      },
      {
        category: '사각 덕트',
        price: 20000,
      },
      {
        category: '원형 덕트',
        price: 15000,
      },
      {
        category: '메인 덕트',
        price: 300000,
      },
      {
        category: '일반 실외기',
        price: 30000,
      },
      {
        category: '대형 실외기',
        price: 50000,
      },
    ],
  },
  washingMachine: {
    product: '세탁기',
    categories: [
      {
        category: '통돌이 5~17kg',
        price: 90000,
      },
      {
        category: '통돌이 18~20kg',
        price: 100000,
      },
      {
        category: '통돌이 21kg~',
        price: 110000,
      },
      {
        category: '드럼 7~17kg',
        price: 120000,
      },
      {
        category: '드럼 18~20kg',
        price: 140000,
      },
      {
        category: '드럼 21kg~',
        price: 160000,
      },
      {
        category: '드럼 빌트인',
        price: 140000,
      },
      {
        category: '건조기',
        price: 250000,
      },
      {
        category: '트윈워시',
        price: 250000,
      },
      {
        category: '통돌이형 아기사랑 세탁기',
        price: 70000,
      },
      {
        category: '드럼형 아기사랑 세탁기',
        price: 100000,
      },
    ],
  },
};


