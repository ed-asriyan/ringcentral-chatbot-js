"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAsyncProxy = void 0;

var _lambda = _interopRequireDefault(require("aws-sdk/clients/lambda"));

var _supertest = _interopRequireDefault(require("supertest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createAsyncProxy = (functionName, filterApp) => {
  const lambda = new _lambda.default({
    region: process.env.AWS_REGION
  });
  return async (event, context) => {
    const lambdaFunction = async () => {
      await lambda.invoke({
        FunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME.replace(/-proxy$/, `-${functionName}`),
        InvocationType: 'Event',
        Payload: JSON.stringify(event)
      }).promise();
      return {
        statusCode: 200,
        headers: {
          'Validation-Token': event.headers['Validation-Token'],
          'Content-Type': 'text/html'
        },
        body: '<!doctype><html><body><script>close()</script><p>Please close this page</p></body></html>'
      };
    };

    if (!filterApp) {
      return lambdaFunction();
    }

    const response = await (0, _supertest.default)(filterApp).get(event.path);

    if (response.statusCode === 404) {
      return lambdaFunction();
    }

    return {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.text
    };
  };
};

exports.createAsyncProxy = createAsyncProxy;
//# sourceMappingURL=lambda.js.map