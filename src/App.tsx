import { useReducer } from "react";
import "./App.css";

const methods: methodType = {
  CHON_SO: "chonSo",
  CHON_PHUONG_THUC: "chonPhuongThuc",
  XOA_TAT_CA: "xoaTatCa",
  TINH_TOAN: "tinhToan",
};

// tính toán kết quả của một biểu thức số học dựa trên các toán hạng và toán tử đã cho.
function evaluate({ TongTruocDo, TongHienTai, PhuongThuc }: initialReducerType): string {
  const pre = parseFloat(TongTruocDo);
  const curr = parseFloat(TongHienTai);

  if (isNaN(pre) || isNaN(curr)) return "";

  switch (PhuongThuc) {
    case "+":
      return String(pre + curr);
    case "-":
      return String(pre - curr);
    case "*":
      return String(pre * curr);
    case "%":
      return String(pre / curr);
    default:
      return "";
  }
}

const reducer = (state: initialReducerType, { method, payload }: actionType): initialReducerType => {
  switch (method) {
    case methods.CHON_SO:
      if (state.TongHienTai === "" && payload === ".") {
        return state;
      }
      if (payload === "." && state.TongHienTai.includes(".")) {
        return state;
      }
      return {
        ...state,
        TongHienTai: `${state.TongHienTai || ""}${payload}`,};
      break;

    case methods.CHON_PHUONG_THUC:
      if (state.TongHienTai === "" && state.TongTruocDo === "") {
        return state;
      }
      if (state.TongHienTai === "") {
        return {
          ...state,
          PhuongThuc: payload,
        };
      }
      if (state.TongTruocDo === "") {
        return {
          ...state,
          PhuongThuc: payload,
          TongTruocDo: state.TongHienTai,
          TongHienTai: "",
        };
      }
      return {
        ...state,
        PhuongThuc: payload,
        TongTruocDo: evaluate(state),
        TongHienTai: "",
      };
      break;
    case methods.XOA_TAT_CA:
      return initialReducer;
    case methods.TINH_TOAN:
      if (
        (state.TongHienTai === "" || state.TongTruocDo === "", state.PhuongThuc === "")) {
        return state;
      }
      return {
        ...state,
        PhuongThuc: "",
        TongTruocDo: "",
        TongHienTai: evaluate(state),
      };
    default:
      return state;
      break;
  }
};

//  trạng thái ban đầu của ứng dụng
const initialReducer = {
  TongTruocDo: "",
  TongHienTai: "",
  PhuongThuc: "",
};

// dispatch: hàm gửi các hành động đến reducer để cập nhật trạng thái.
function App() {
  const [{ TongTruocDo, TongHienTai, PhuongThuc }, dispatch] = useReducer(
    reducer,
    initialReducer
  );
  return (
    <>
      <div className="container max-w-[1440px] mx-auto">
        <div className="calculator max-w-[500px] mx-auto mt-[200px] grid grid-cols-4 grid-row gap-2 shadow-2xl rounded-lg p-4">
          <p className="col-span-4 min-h-[50px] flex flex-col items-end justify-end font-medium pb-5 gap-1">
            <p className="text-[20px] text-[gray] font-[300] mr-4 min-h-7">
              {TongTruocDo}
              {PhuongThuc}
            </p>
            <p className="text-[24px] font-[400] min-h-7">{TongHienTai}</p>
          </p>
          <p
            className="digit"
            onClick={() =>
              dispatch({ method: methods.CHON_PHUONG_THUC, payload: "+" })
            }
          >
            +
          </p>
          <p
            className="digit"
            onClick={() =>
              dispatch({ method: methods.CHON_PHUONG_THUC, payload: "-" })
            }
          >
            -
          </p>
          <p
            className="digit"
            onClick={() =>
              dispatch({ method: methods.CHON_PHUONG_THUC, payload: "*" })
            }
          >
            *
          </p>
          <p
            className="digit"
            onClick={() =>
              dispatch({ method: methods.CHON_PHUONG_THUC, payload: "%" })
            }
          >
            %
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "7" })}
          >
            7
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "8" })}
          >
            8
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "9" })}
          >
            9
          </p>
          <p
            className="digit row-span-4"
            onClick={() => dispatch({ method: methods.TINH_TOAN, payload: "" })}
          >
            =
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "4" })}
          >
            4
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "5" })}
          >
            5
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "6" })}
          >
            6
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "1" })}
          >
            1
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "2" })}
          >
            2
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "3" })}
          >
            3
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "0" })}
          >
            0
          </p>
          <p
            className="digit"
            onClick={() => dispatch({ method: methods.CHON_SO, payload: "." })}
          >
            .
          </p>
          <p
            className="digit"
            onClick={() =>
              dispatch({ method: methods.XOA_TAT_CA, payload: "Ac" })
            }
          >
            AC
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
