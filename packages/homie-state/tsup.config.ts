import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // 번들 시작점
  format: ['cjs', 'esm'], // CommonJS와 ESM 형식으로 출력
  dts: true, // 타입 정의 파일 생성
  outDir: 'dist', // 출력 디렉토리
  clean: true, // 빌드 전에 출력 디렉토리 삭제
  external: ['react', 'react-dom', '@types/react', '@types/react-dom'], // 외부 의존성으로 설정
});
