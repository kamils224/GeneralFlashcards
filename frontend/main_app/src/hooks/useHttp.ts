import {useReducer, useCallback, Reducer} from "react";

enum ActionType {
  Send = "SEND",
  Success = "SUCCESS",
  Error = "ERROR"
}

type State<T> = {
  data?: T,
  error?: any,
  pending: boolean
}

type Action<T> =
        | { type: ActionType.Send }
        | { type: ActionType.Success, responseData: T }
        | { type: ActionType.Error, errorMessage: string }

function httpReducer<T>(state: State<T>, action: Action<T>): State<T> {
  if (action.type === ActionType.Send) {
    return {
      pending: true,
    };
  }
  if (action.type === ActionType.Success) {
    return {
      data: action.responseData,
      pending: false,
    };
  }
  if (action.type === ActionType.Error) {
    return {
      error: action.errorMessage,
      pending: false,
    };
  }
  return state;
}

function useHttp<T>(requestFunction: (payload?: any) => Promise<T>, startWithPending = false) {
  const [httpState, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(httpReducer, {
    pending: startWithPending,
  } as State<T>);

  const sendRequest = useCallback(
      async function(requestData?: any) {
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
    ...httpState,
  };
}

export default useHttp;
