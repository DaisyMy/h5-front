// 抽离itemElements
export const getImgElements = (itemElements) => {
  const imgElements = [];
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'));
  });
  return imgElements;
};

// 生成所有图片链接数组
export const getAllImg = (imgElements) => {
  return imgElements.map((imgElement) => {
    return imgElement.src;
  });
};

// 监听图片数组加载完成
export const onComplateImgs = (imgs) => {
  // 创建一个空数组promiseAll，用于存储每个图片的Promise对象
  const promiseAll = [];
  // 遍历imgs数组
  imgs.forEach((img, index) => {
    // 创建一个新的Promise对象，用于存储图片的加载状态
    promiseAll[index] = new Promise((resolve, reject) => {
      // 创建一个新的Image对象
      const imageObj = new Image();
      imageObj.src = img;
      // 当图片加载成功时，调用resolve函数，并传入图片和索引
      imageObj.onload = () => {
        resolve({
          img,
          index,
        });
      };
      // 当图片加载失败时，调用resolve函数，并传入图片和索引
      imageObj.onerror = () => {
        resolve({
          img,
          index,
        });
      };
    });
  });
  // 返回Promise.all(promiseAll)，等待所有图片加载完成
  return Promise.all(promiseAll);
};

// 获取高度追小列
export const getMinHeightColumn = (columnHeightObj) => {
  const minHeigth = getMinHeight(columnHeightObj);
  return Object.keys(columnHeightObj).find((key) => columnHeightObj[key] === minHeigth);
};

export const getMinHeight = (columnHeightObj) => {
    const columnHeigthArr = Object.values(columnHeightObj);
    return Math.min(...columnHeigthArr);
}


export const getMaxHeight = (columnHeightObj) => {
    const columnHeigthArr = Object.values(columnHeightObj);
    return Math.max(...columnHeigthArr);
}