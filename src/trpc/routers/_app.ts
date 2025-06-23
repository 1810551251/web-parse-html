import { z } from 'zod';
import axios from 'axios';
import { baseProcedure, createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  // 你原有的 hello 方法
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  //请求url
 fetchUrl: baseProcedure
    .input(z.object({ url: z.string().url() }))
    .query(async ({ input }) => {
      const { url } = input;
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      return response.data; 
    }),
  });

// 导出类型定义
export type AppRouter = typeof appRouter;