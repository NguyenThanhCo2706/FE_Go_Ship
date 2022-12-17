

export const handleError = (error: any) => {
  switch (error.response.status) {
    case 400:
      return error.response.data.detail;
    case 500:
      return "Đang có lỗi ở Server";
    default:
      return "OOps";
  }
}