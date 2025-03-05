import { render, screen } from "@testing-library/react";
import Header from "@/components/header/header"; // Header 컴포넌트 경로 확인!
import StoreProvider from "@/app/store-provider";

test("Header 컴포넌트가 정상적으로 렌더링되는지 확인", () => {
  render(
    <StoreProvider>
      <Header />
    </StoreProvider>
  );

  screen.debug();

  const header = screen.getByRole("banner");
  expect(header).toBeInTheDocument();
});
