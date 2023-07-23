// SSG를 동적일때 대비하여 path에게 아이디를 다 넘겨준다.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPathId = async () => {
  try {
    const response = await prisma.articles.findMany({
      select: {
        id: true,
      },
    });

    // 데이터 잘 들어오면 아래 작업 시작
    if (response) {
      const paths = [];

      // path형식에 맞게 배열로 만들어주기
      for (let path of response) {
        let newParams = {
          params: {
            id: String(path.id),
          },
        };
        paths.push(newParams);
      }
      // 만든 배열 반환하기
      console.log(paths);

      return paths;
    } else {
      console.log('데이터없음');
    }
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};
