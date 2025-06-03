import request from '@/utils/request';

/**
 * 获取图片数据列表
 */
export const getPexelsList = (data) => {
  return request({
    url: '/pexels/list',
    params: data,
  });
};

/**
 * 搜索词联想
 */
export const getHint = (q) => {
  return request({
    url: '/pexels/hint',
    params: { q },
  });
};

/**
 * 获取推荐主题
 */
export const getThemes = () => {
  return request({
    url: '/pexels/themes',
  });
};
