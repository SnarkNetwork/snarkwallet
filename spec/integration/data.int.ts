import { Validator, ValidatorResult } from 'jsonschema';
import { schema } from '../../common/libs/validators';
import 'url-search-params-polyfill';
import RPCNode from 'libs/nodes/rpc';
import RpcNodeTestConfig from './RpcNodeTestConfig';
import { StaticNodeConfig } from 'types/node';
import { staticNodesExpectedState } from '../reducers/config/nodes/staticNodes.spec';

const v = new Validator();

const validRequests = {
  address: '0x72948fa4200d10ffaa7c594c24bbba6ef627d4a3',
  transaction: {
    data: '',
    from: '0x72948fa4200d10ffaa7c594c24bbba6ef627d4a3',
    to: '0x72948fa4200d10ffaa7c594c24bbba6ef627d4a3',
    value: '0xde0b6b3a7640000'
  },
  token: {
    address: '0x4156d3342d5c385a87d264f90653733592000581',
    symbol: 'SALT',
    decimal: 8
  }
};

interface RPCTestList {
  [key: string]: ((n: RPCNode) => Promise<ValidatorResult>);
}

const testGetBalance = (n: RPCNode) => {
  return n.client
    .call(n.requests.getBalance(validRequests.address))
    .then(data => v.validate(data, schema.RpcNode));
};

const testEstimateGas = (n: RPCNode) => {
  return n.client
    .call(n.requests.estimateGas(validRequests.transaction))
    .then(data => v.validate(data, schema.RpcNode));
};

const testGetTokenBalance = (n: RPCNode) => {
  const { address, token } = validRequests;
  return n.client
    .call(n.requests.getTokenBalance(address, token))
    .then(data => v.validate(data, schema.RpcNode));
};

const RPCTests: RPCTestList = {
  getBalance: testGetBalance,
  estimateGas: testEstimateGas,
  getTokenBalance: testGetTokenBalance
};

function testRpcRequests(node: RPCNode, service: string) {
  Object.keys(RPCTests).forEach(testType => {
    describe(`RPC (${service}) should work`, () => {
      it(
        `RPC: ${testType} ${service}`,
        () => {
          return RPCTests[testType](node).then(d => expect(d.valid).toBeTruthy());
        },
        10000
      );
    });
  });
}

const mapNodeEndpoints = (nodes: { [key: string]: StaticNodeConfig }) => {
  const { RpcNodes } = RpcNodeTestConfig;

  RpcNodes.forEach(n => {
    testRpcRequests(nodes[n].lib as RPCNode, `${nodes[n].service} ${nodes[n].network}`);
  });
};

mapNodeEndpoints((staticNodesExpectedState.initialState as any) as {
  [key: string]: StaticNodeConfig;
});
