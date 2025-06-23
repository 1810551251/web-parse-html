import { z } from 'zod';

export const urlSchema = z.object({
  url: z.string().min(1, { message: "请输入网址." }).url({ message: "请输入合法的完整网址 (e.g., https://edimakor.hitpaw.com/video-editing-tips/how-much-does-pewdiepie-make.html)" }),
});

export type UrlFormData = z.infer<typeof urlSchema>;