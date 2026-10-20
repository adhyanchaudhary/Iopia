import test from 'node:test';
import assert from 'node:assert/strict';
import {activation,feature,classificationPoints,sceneAt,nextTime} from '../src/lesson/math.js';

test('the displayed four-ReLU network separates every displayed class at h = 1.6',()=>{
 const points=classificationPoints();
 assert.equal(points.filter(p=>p.inner).length,44);
 for(const p of points) {
  assert.ok(Math.abs(feature(p.x,p.y)-(Math.abs(p.x)+Math.abs(p.y)))<1e-12);
  assert.equal(feature(p.x,p.y)<1.6,p.inner,`incorrect class for point ${p.index}`);
 }
});
test('the lab preserves the mathematical ranges and symmetry of each activation',()=>{
 for(let x=-4;x<=4;x+=.125) {
  assert.equal(activation('ReLU',x),x<0?0:x);
  assert.ok(activation('Sigmoid',x)>0&&activation('Sigmoid',x)<1);
  assert.ok(Math.abs(activation('Sigmoid',x)+activation('Sigmoid',-x)-1)<1e-12);
  assert.ok(Math.abs(activation('Tanh',x)+activation('Tanh',-x))<1e-12);
 }
});
test('scene transitions are exact in both forward and backward seek order',()=>{
 const cases=[[0,0],[9.999,0],[10,1],[19.999,1],[20,2],[34.999,2],[35,3],[49.999,3],[50,4],[60,4]];
 for(const [time,scene] of [...cases,...cases.toReversed()])assert.equal(sceneAt(time),scene);
});
test('one playback clock preserves elapsed duration across frame rates and speeds',()=>{
 for(const fps of [30,60,144]) {
  let time=0;for(let frame=0;frame<fps*7;frame++)time=nextTime(time,1/fps,1.5);
  assert.ok(Math.abs(time-10.5)<1e-9);
 }
 assert.equal(nextTime(59.9,1,2),60);
 assert.equal(nextTime(0,-5,1),0);
});
