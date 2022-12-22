1. redux > reducers > index.js 이 녀석은
   chatRoom_reducer.js 랑 chatRoom_reducer.js 를 묶어서
   간편하게 부를 수 있게 만든 녀석임.
   즉, 리듀서의 모임
   combineReducer란,
   여러개의 리듀서를 하나의 스토어에서 다 실행합시다. 하는 것이므로

주스탠드에서는 하나의 store 파일에다가 상태랑 리듀서를 다 놓고
나중에는 구조분해할당으로 불러서쓰기만 하면된다.

2. 리덕스의 connect로 생성된 wrapper component는 Redux store를 구독한다.
   mapStateToProps 란, 스토어에서 데이터의 부분을 선택하여 사용한다. 즉, 연결된 컴포넌트가 필요한 데이터만 스토어에서 가져온다.그니까 쉬운말로 state를 가져와서 쓰려고 한거다.(쓸때는 props.props.user.uid)

const mapStateToProps = (state) => {
return {
user: state.user.currentUser, ---> user_reducer.js에서 currentUser state.
chatRoom: state.chatRoom.currentChatRoom, ---> chatRoom_reducer.js에서 currentChatRoom state.
};
};

3. useSelector로 state값을 가져오도록 하고, dispatch를 통해 스토어 상태를 변경시키기 위해 액션을 호출한다.
   그니까 즉,
   useSelector : connect의 진화형

4. 에.. 한마디로 정리하자면,

지금 dispatch에서 액션을 부르고 액션은 타입을 필요로하고 (그래서 타입을 지정해놨고)

근데, 주스탠드에서는 그냥 스토어에 만들어둔 함수를 가져와서 쓰기만 하면됨.
그리고, state도 마찬가지로 connect나 useSelector로 가져올 필요 없이 스토어에 만들어둔 state를 가져와서 쓰기만 하면됨.

```tsx
** 채팅 사용자 state */
interface ChatUserState {
  initialUserState: {
    currentUser: {
      image: string;
     _id: string;
    email: string;
    nickName: string;
    name: string;
    };
    isLoading: boolean;

  };

  setUser: (currentUser: object, isLoading: boolean) => void;
  setPhotoUrl: (state: object, photoURL: string) => void;
}

/** 채팅 사용자 store */
export const chatUserStore = create<ChatUserState>((set) => ({
  initialUserState: {
    currentUser: {
      name: ''
    },
    isLoading: true,
  },
  setUser: (user) =>
    set((state) => ({
      initialUserState: {
        ...state.initialUserState,
        currentUser: user,
        isLoading: false,
      },
    })),

  setPhotoUrl: (url) =>
    set((state) => ({
      initialUserState: {
        ...state.initialUserState,
        currentUser: { ...state.initialUserState.currentUser, photoURL: url },
        isLoading: false,
      },

})))
```

/\*_ 채팅 사용자 state _/
interface ChatUserState {
initialUserState: {
currentUser: {
image: string;
\_id: string;
email: string;
nickName: string;
name: string;
};
isLoading: boolean;

};

setUser: (currentUser: object, isLoading: boolean) => void;
setPhotoUrl: (state: object, photoURL: string) => void;
}

/\*_ 채팅 사용자 store _/
export const chatUserStore = create<ChatUserState>((set) => ({
initialUserState: {
currentUser: {
name: ''
},
isLoading: true,
},

/\*\* chatUserStore.setUser(유저변경값, 로딩상태값);

- initialUserState.currentUser => 유저변경값
-
- 배열일 때 : set((state) => ({
  hashTags: [...state.hashTags, hashTagInputText.trim()],
  })),


    image: string;
    suspension: boolean;
    _id: string;
    email: string;
    nickName: string;
    name: string;
    phoneNumber: string;
    postalCode: string;
    address1: string;
    address2: string;
    createdAt: string;
    updatedAt: string;
    __v: number;

state로 사용하려고 하는것
: \_id: string;

(현재 로그인한 사용자 가져오기)
로그인하면 console창에 토큰이 뜸. -> 그 토큰으로(payload변환) 로그인한 사용자의 id를 확인함.

(전체 사용자 가져오기)
const {data} = useQuery(
['lendPostData'],
() =>
axios.get(
`https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/user/${id}`,
),
{
refetchOnMount: 'always', <<- 마운트? 마운트 할 때마다 리패치 되게끔.,....
refetchOnWindowFocus: false,
staleTime: 60 _ 1000 _ 60, // 1시간
onSuccess: (res) => {
if (res?.data.postType)
상품을 등록 -> 글의 고유 id << /borrow/:id , /lend/:id << 그게 돼서 내가 빌리고 싶습니다/ 빌려줄겁니다 <<
},
onError: () => console.log('error'),
},
);

상상도)
billig/id
state {
borl: "lend"
}
render -> if(state.borl === "borrow")

빌려주기/빌려주세요 게시판분리 해도되는데
그냥 사용자가 필터걸어서...
[빌려주세요] [빌려주기]

\*/

setUser: (user) =>
set((state) => ({
initialUserState: {
...state.initialUserState,
currentUser: user,
isLoading: false,
},
})),

setPhotoUrl: (url) =>
set((state) => ({
initialUserState: {
...state.initialUserState,
currentUser: { ...state.initialUserState.currentUser, photoURL: url },
isLoading: false,
},

}));

/\*
currentUser: user값

setPhotoUrl 함수
currentUser: {
user: user값

}
\*/
