import 'reflect-metadata';

import supertest from 'supertest';
import { createApp, jsonParser } from '../';
import { container } from 'tsyringe';
import { kLogger } from '@soulkiller/injection';
import type { Request, Response } from 'polka';

container.register(kLogger, {
  useValue: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn()
  }
});

const mockedHandler = jest.fn<void, [Request, Response]>((_, res) => res.end());

afterEach(() => mockedHandler.mockClear());

const app = createApp();
app.post('/test', jsonParser(), mockedHandler);
app.listen(0);

// @ts-ignore
afterAll(() => app.server.close());

test('missing content type', async () => {
  await supertest(app.server)
    .post('/test')
    .expect(400);

  expect(mockedHandler).not.toHaveBeenCalled();
});

test('invalid data', async () => {
  await supertest(app.server)
    .post('/test')
    .type('json')
    .send('foo')
    .expect(422);

  expect(mockedHandler).not.toHaveBeenCalled();
});

test('valid data', async () => {
  await supertest(app.server)
    .post('/test')
    .type('json')
    .send({ foo: 'bar' })
    .expect(200);

  expect(mockedHandler).toHaveBeenCalledTimes(1);
  expect(mockedHandler.mock.calls[0]![0]).toHaveProperty('body');
});
