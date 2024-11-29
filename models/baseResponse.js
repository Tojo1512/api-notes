class BaseResponse {
  constructor(status = 200, data = null, error = null, meta = null) {
    this.status = status;
    this.data = data;
    this.error = error;
    this.meta = meta
      ? meta
      : {
          timestamp: new Date().toISOString(),
          version: "1.0",
        };
  }

  static success(data, meta = null, status = "success") {
    return new BaseResponse(status, data, null, meta);
  }

  static error(message, status = "error", details = null) {
    const error = {
      message: message,
      details: details,
    };
    return new BaseResponse(status, null, error);
  }

  static paginated(data, pagination, meta = {}) {
    return new BaseResponse(200, data, null, {
      ...meta,
      pagination: {
        total: pagination.total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(pagination.total / pagination.limit),
      },
    });
  }
}

module.exports = BaseResponse;
