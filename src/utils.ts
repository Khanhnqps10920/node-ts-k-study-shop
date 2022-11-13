export interface IControllerType {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: any;
}

export interface FlexibleObject {
  [index: string]: any;
}

export const formatJSONResponse = (
  statusCode: number,
  message: string,
  data: any
) => {
  return {
    statusCode,
    body: {
      message,
      data,
    },
  };
};

export const errorResponse = (error: any) => {
  let errorInfo = error;
  let statusCode = error.statusCode ? error.statusCode : 500;
  let message = error.message ? error.message : 'Internal server error';

  if (error.name === 'CastError' || error.name === 'BSONTypeError') {
    statusCode = 400;
    message = 'Invalid ObjectId';
    errorInfo = {};
  }

  return formatJSONResponse(statusCode, message, errorInfo);
};
