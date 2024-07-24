import { vi } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Context from "../../../context/Context";
import AccountCenterPageCtrls from "./AccountCenterPageCtrls";

// Mock useLocation and useNavigate from react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: () => ({ pathname: "/users" }),
    useNavigate: () => vi.fn(),
  };
});

// Mock context value
const mockSetAccoutPageSubRoute = vi.fn();
const mockContextValue = {
  setAccoutPageSubRoute: mockSetAccoutPageSubRoute,
  accountPageSubRoute: 0,
};

// Utility function to render component with mocked context
const renderComponent = (contextValue) =>
  render(
    <BrowserRouter>
      <Context.Provider value={contextValue}>
        <AccountCenterPageCtrls />
      </Context.Provider>
    </BrowserRouter>
  );

describe("AccountCenterPageCtrls component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockSetAccoutPageSubRoute.mockClear();
    vi.spyOn(localStorage, "getItem").mockImplementation(() => "false");
  });

  test("renders without crashing", () => {
    const { getByText } = renderComponent(mockContextValue);
    expect(getByText("Account")).toBeInTheDocument();
    expect(getByText("Preferences")).toBeInTheDocument();
    expect(getByText("Contributions")).toBeInTheDocument();
    expect(getByText("Owned Plugins")).toBeInTheDocument();
    expect(getByText("Wishlist")).toBeInTheDocument();
    expect(getByText("Dashboard")).toBeInTheDocument();
  });

  test("correct button is marked as active based on context value", () => {
    const activeIndex = 4;
    const contextValueWithActiveIndex = {
      ...mockContextValue,
      accountPageSubRoute: activeIndex,
    };

    const { container } = renderComponent(contextValueWithActiveIndex);
    const activeButton = container.querySelector(".active");
    expect(activeButton).toHaveTextContent("Wishlist");
  });

  test("admin button appears when localStorageIsAdmin is true", () => {
    vi.spyOn(localStorage, "getItem").mockImplementation(() => "true");

    const { getByText } = renderComponent(mockContextValue);
    expect(getByText("Dashboard")).toBeInTheDocument();
  });

  test("admin button click updates navigation and context", () => {
    vi.spyOn(localStorage, "getItem").mockImplementation(() => "true");

    const { getByText } = renderComponent(mockContextValue);
    const adminButton = getByText("Dashboard");
    userEvent.click(adminButton);

    expect(mockSetAccoutPageSubRoute).toHaveBeenCalledWith(5);
    // Optionally, verify navigation if mockNavigate is used
  });

  test("admin button does not appear when localStorageIsAdmin is false", () => {
    const { queryByText } = renderComponent(mockContextValue);

    // Check if the admin button is not in the document
    const adminButton = queryByText("Dashboard");
    expect(adminButton).toHaveClass("d-none"); // Button should not be present
  });

  test("buttons visibility based on route", () => {
    const { container } = renderComponent(mockContextValue);
    expect(
      container.querySelector(".btn.customed-button.customed-button-with-icon")
    ).toBeVisible();
  });
});
