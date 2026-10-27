/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePedagogicalRules, parseAnswerVector, ARCHETYPES_DATA } from './pedagogicalEngine';

test('Insufficient data guard triggers when attemptsCount < minSampleSizeN', () => {
  const result = evaluatePedagogicalRules({
    falseRate: 0.6,
    attemptsCount: 3,
    p1TimeMinutes: 15,
    vocabErrorRate: 0.2,
    minSampleSizeN: 5
  });

  assert.equal(result.activeRuleId, 'RULE-INSUFFICIENT-DATA');
  assert.equal(result.isTriggered, false);
  assert.match(result.explanation, /ngưỡng tối thiểu N >= 5/);
});

test('Rule R-TIME-01 fires when Passage 1 time exceeds 22 minutes', () => {
  const result = evaluatePedagogicalRules({
    falseRate: 0.3,
    attemptsCount: 15,
    p1TimeMinutes: 25.5,
    vocabErrorRate: 0.2,
    minSampleSizeN: 5
  });

  assert.equal(result.activeRuleId, 'R-TIME-01');
  assert.equal(result.isTriggered, true);
  assert.match(result.recommendedStep1, /15 - 20 - 25 Phút/);
});

test('Rule R-VOCAB-02 fires when vocabulary error rate exceeds 50%', () => {
  const result = evaluatePedagogicalRules({
    falseRate: 0.2,
    attemptsCount: 12,
    p1TimeMinutes: 16,
    vocabErrorRate: 0.55,
    minSampleSizeN: 5
  });

  assert.equal(result.activeRuleId, 'R-VOCAB-02');
  assert.equal(result.isTriggered, true);
  assert.match(result.recommendedStep1, /Paraphrase/);
});

test('Rule R-LOGIC-08 fires when False/Not Given rate exceeds 40%', () => {
  const result = evaluatePedagogicalRules({
    falseRate: 0.58,
    attemptsCount: 12,
    p1TimeMinutes: 16.5,
    vocabErrorRate: 0.2,
    minSampleSizeN: 5
  });

  assert.equal(result.activeRuleId, 'R-LOGIC-08');
  assert.equal(result.isTriggered, true);
  assert.match(result.recommendedStep1, /Mâu thuẫn Trực tiếp/);
});

test('parseAnswerVector parses answer strings and extracts counts correctly', () => {
  const input = '1:TRUE, 2:FALSE (User: NG), 3:NOT GIVEN (User: FALSE), 4:TRUE, 5:NOT GIVEN (User: FALSE)';
  const result = parseAnswerVector(input);

  assert.equal(result.totalParsed, 5);
  assert.equal(result.correctCount, 2);
  assert.equal(result.errorRatio, 0.6);
  assert.equal(result.falseWrongCount + result.ngWrongCount, 3);
});

test('Archetype dataset contains complete A, B, and C profiles with diagnostics', () => {
  assert.ok(ARCHETYPES_DATA['A']);
  assert.ok(ARCHETYPES_DATA['B']);
  assert.ok(ARCHETYPES_DATA['C']);

  assert.equal(ARCHETYPES_DATA['B'].id, 'STU-2024-88A');
  assert.equal(ARCHETYPES_DATA['B'].readingMastery, 62);
  assert.equal(ARCHETYPES_DATA['B'].listeningMastery, 74);
  assert.equal(ARCHETYPES_DATA['B'].pathway.length, 3);
  assert.equal(ARCHETYPES_DATA['B'].diagnostics.length, 4);
});
