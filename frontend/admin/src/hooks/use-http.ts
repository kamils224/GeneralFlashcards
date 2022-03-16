import {useReducer, useCallback} from "react";

enum ActionType {
  SEND = "SEND",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}

type State = {
  data: Record<string, any> | null,
  error: string | null,
  pending: boolean
}

type Action =
        | { type: ActionType.SEND }
        | { type: ActionType.SUCCESS, responseData: Record<string, any> }
        | { type: ActionType.ERROR, errorMessage: string }

function httpReducer(state: State, action: Action) {
  if (action.type === ActionType.SEND) {
    return {
      data: null,
      error: null,
      pending: true,
    };
  }
  if (action.type === ActionType.SUCCESS) {
    return {
      data: action.responseData,
      error: null,
      pending: false,
    };
  }
  if (action.type === ActionType.ERROR) {
    return {
      data: null,
      error: action.errorMessage,
      pending: false,
    };
  }
  return state;
}

function useHttp(requestFunction: any, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    error: null,
    pending: startWithPending,
  } as State);

  const sendRequest = useCallback(
      async function(requestData) {
        dispatch({type: ActionType.SEND});
        try {
          const responseData = await requestFunction(requestData);
          dispatch({type: ActionType.SUCCESS, responseData});
        } catch (error: any ) {
          dispatch({
            type: ActionType.ERROR,
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
