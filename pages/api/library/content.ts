import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface DataType {
  id: number;
  title: string;
  content?: string;
  like_count: number;
  img: string;
}

export const getArticleAll = async (skip: number, take: number) => {
  try {
    const response = await prisma.articles.findMany({
      skip: skip,
      take: take,
    });
    return response;
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};

type Data = {
  items?: any;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { skip, take } = req.query;
  if (!skip || !take) {
    res.status(400).json({ message: 'No Request Information' });
    return;
  }
  try {
    const response: DataType[] | undefined = await getArticleAll(
      Number(skip),
      Number(take),
    );
    // fliter로 필요한 것만
    const filtering = response?.map((el) => {
      const newEl = { ...el };
      delete newEl.content;
      return newEl;
    });

    res.status(200).json({
      items: filtering,
      message: `success skip: ${skip}~ take ${take}`,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Fail' });
  }
};

export default handler;
