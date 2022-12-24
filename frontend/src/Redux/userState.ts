import { UserModel } from "../Models/user_model";

export class UserState { 
    user?: UserModel ;
}

export enum UserActionType { 
    userUpdate = "userUpdate",
    login= "login",
    follow = "follow",
    logout = "logout"
}

export interface UserAction { 
    type: UserActionType,
    payload? : any;
}

export function userUpdate(user: UserModel): UserAction {
    return { type: UserActionType.userUpdate, payload: user }
}

//Actions
export function login(user: UserModel): UserAction {
    return { type: UserActionType.login, payload: user }
}

export function follow(user: UserModel): UserAction {
    return { type: UserActionType.follow, payload: user }
}

export function logout(): UserAction {
    return { type: UserActionType.logout, payload: null }
}


//reducer
export function UserReducer(currentUserState: UserState = new UserState, action: UserAction): UserState {
    const newUserState = {...currentUserState};

    switch (action.type) {
        case UserActionType.login:
            newUserState.user = action.payload;
        break;

        case UserActionType.logout:
            newUserState.user = undefined;
        break;

        case UserActionType.follow:
            newUserState.user = action.payload;
        break;

        case UserActionType.userUpdate:
            newUserState.user = action.payload;
    }
    return newUserState;
}


