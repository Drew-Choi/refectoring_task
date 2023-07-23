// 좋아요 업데이트
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const likeUpdate = async (id: number, like: number) => {
  try {
    const response = await prisma.articles.findUnique({
      where: {
        id: id,
      },
    });

    if (!response) throw new Error('데이터 없음');
    // 데이터가 잘 들어왔다면,
    const newLike = response.like_count + like;

    await prisma.articles.update({
      where: {
        id: id,
      },
      data: {
        like_count: newLike,
      },
    });

    const result = 'Success';
    return result;
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

type Data = {
  items?: any;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  const { like_count } = req.body;
  if (!id || !like_count) {
    res.status(400).json({ message: 'No Request Information' });
    return;
  }
  try {
    const response: any | undefined = await likeUpdate(Number(id), like_count);

    if (response === 'Success') {
      res.status(200).json({
        message: `Success`,
      });
    } else {
      res.status(400).json({ message: 'Fail' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Fail' });
  }
};

export default handler;
