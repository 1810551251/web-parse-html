import axios from 'axios';

export const fetchPageHtmlViaProxy = async (targetUrl: string): Promise<string> => {
  try {
    // 调用 Flask API
    const response = await axios.get('http://127.0.0.1:5000/fetch-page', {
      params: {
        url: targetUrl
      },
      headers: {
        // 如果需要的话可以添加其他头
        'Accept': 'text/html'
      }
    });
    // console.log('Response from Flask API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw new Error('Failed to fetch the page. The site may block automated requests.');
  }
};