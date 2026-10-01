/**
 * 줄바꿈 다듬기 — 구분 기호(·, —, →)가 다음 줄 첫머리로 떨어지지 않게 앞 단어에 붙인다.
 * 중개사코치 attachMiddot 과 같은 원리: 기호 **앞**만 붙이고 뒤는 그대로 둬서 기호 뒤에서는 줄이 바뀔 수 있다.
 *  · "A · B"  → "A · B"   (앞 공백을 줄바꿈 없는 공백으로)
 *  · "A·B"    → "A⁠·B"    (붙여 쓴 가운뎃점 앞에 word joiner)
 */
const NBSP = " ";
const WJ = "⁠";

export function glue(text: string): string {
  return text.replace(/ (·|—|→) /g, `${NBSP}$1 `).replace(/(\S)·(?=\S)/g, `$1${WJ}·`);
}

/** 객체 · 배열 안의 모든 문자열에 glue 를 적용한 사본. */
export function glueDeep<T>(value: T): T {
  if (typeof value === "string") return glue(value) as T;
  if (Array.isArray(value)) return value.map((v) => glueDeep(v)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, glueDeep(v)])) as T;
  }
  return value;
}
