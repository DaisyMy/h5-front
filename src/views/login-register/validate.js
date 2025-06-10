// 导出一个验证密码的函数
export const validatePassword = (value) => {
  if (!value) {
    return '密码不能为空';
  }
  if (value.length < 6 || value.length > 12) {
    return '密码长度在6-12之间';
  }
  return true;
};
// 验证用户名函数
export const validateUsername = (value) => {
  if (!value) {
    return '用户名不能为空';
  }
  if (value.length < 4 || value.length > 16) {
    return '用户名长度在4-16之间';
  }
  return true;
};

/**
 * 确认密码的表单校验
 */
export const validateConfirmPassword = (value, password) => {
  if (value !== password[0]) {
    return '两次密码输入必须一致';
  }
  return true;
};
