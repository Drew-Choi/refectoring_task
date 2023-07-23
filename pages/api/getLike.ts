// SSG를 동적일때 대비하여 path에게 아이디를 다 넘겨준다.

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const getAllLike = async () => {
  try {
    const response = await prisma.articles.findMany({
      select: {
        like_count: true,
      },
    });

    if (response) {
      return response;
    } else {
      console.log('데이터없음');
    }
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};

type Data = {
  items?: any;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const response = await getAllLike();
    res.status(200).json({ items: response, message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail' });
  }
};

export default handler;
