// export interface IResponse<T> {
//     time: string;
//     code: number;
//     path: string;
//     status: string;
//     message: string;
//     data: T;
// }

const createResponse = (data, message = "Success", code = 200, path = "", status = "OK") => {
  return {
    time: new Date().toISOString(),
    code: code,
    path: path,
    status: status,
    message: message,
    data: data
  };
};