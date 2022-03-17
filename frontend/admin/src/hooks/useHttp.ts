import {useReducer, useCallback} from "react";

enum ActionType {
  Send = "SEND",
  Success = "SUCCESS",
  Error = "ERROR"
}

type State<T> = {
  data: T | null,
  error: string | null,
  pending: boolean
}

type Action =
        | { type: ActionType.Send }
        | { type: ActionType.Success, responseData: Record<string, any> }
        | { type: ActionType.Error, errorMessage: string }

function httpReducer<T>(state: State<T>, action: Action) {
  if (action.type === ActionType.Send) {
    return {
      data: null,
      error: null,
      pending: true,
    } as State<T>;
  }
  if (action.type === ActionType.Success) {
    return {
      data: action.responseData,
      error: null,
      pending: false,
    } as State<T>;
  }
  if (action.type === ActionType.Error) {
    return {
      data: null,
      error: action.errorMessage,
      pending: false,
    } as State<T>;
  }
  return state as State<T>;
}

function useHttp<T>(requestFunction: any, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    error: null,
    pending: startWithPending,
  } as State<T>);

  const sendRequest = useCallback(
      async function(requestData) {
        dispatch({type: ActionType.Send});
        try {
          const responseData = await requestFunction(requestData);
          dispatch({type: ActionType.Success, responseData});
        } catch (error: any ) {
          dispatch({
            type: ActionType.Error,
            errorMessage: error.message || "Something went wrong!",
          });
        }
      },
      [requestFunction],
  );

  return {
    sendRequest,
    ...httpState as State<T>,
  };
}

export default useHttp;
