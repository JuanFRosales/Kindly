import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Icon, Badge} from '@rneui/base';
import {useEffect, useReducer} from 'react';
import {useApproval} from '../hooks/apiHooks';
import {Approval, MediaItemWithOwner} from '../types/DBTypes';

type ApprovalState = {
  count: number;
  userApproval: Approval | null;
};

type ApprovalAction = {
  type: 'setApprovalCount' | 'approval';
  count?: number;
  approval?: Approval| null;
};

const approvalInitialState: ApprovalState = {
  count: 0,
  userApproval: null,
};

const approvalReducer = (state: ApprovalState, action: ApprovalAction): ApprovalState => {
  switch (action.type) {
    case 'setApprovalCount':
      return {...state, count: action.count ?? 0};
    case 'approval':
      if (action.approval !== undefined) {
        return {...state, userApproval: action.approval};
      }
      return state; // no change if action.approval is undefined
  }
  return state; // Return the unchanged state if the action type is not recognized
};

const Approvals = ({item}: {item: MediaItemWithOwner}) => {
  const [approvalState, approvalDispatch] = useReducer(approvalReducer, approvalInitialState);
  const {getUserApproval, getCountByMediaId, postApproval, deleteApproval} = useApproval();


  const getApprovals = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    try {
      const userApproval = await getUserApproval(item.media_id, token);
      approvalDispatch({type: 'approval', approval: userApproval});
    } catch (e) {
      approvalDispatch({type: 'approval', approval: null});
      // FAKE approval object for testing only
      //approvalDispatch({type: 'approval', approval: {approval_id: 3, media_id: 5, user_id: 3, created_at: new Date()}});
      console.log('get user approval error', (e as Error).message);
    }
  };

  // get approval count
  const getApprovalCount = async () => {
    try {
      const countResponse = await getCountByMediaId(item.media_id);
      approvalDispatch({type: 'setApprovalCount', count: countResponse.count});
    } catch (e) {
      approvalDispatch({type: 'setApprovalCount', count: 0});
      console.log('get user approval error', (e as Error).message);
    }
  };

  useEffect(() => {
    getApprovals();
    getApprovalCount();
  }, [item]);

  const handleApproval = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!item || !token) {
        return;
      }

      if (approvalState.userApproval) {
        // delete the approval and dispatch the new approval count to the state.
        await deleteApproval(approvalState.userApproval.approval_id, token);
        // Dispatching is already done in the getApprovals and getApprovalCount functions.
        // other way, is to do update locally after succesfull api call
        // for deleting it's ok because there is no need to get any data from the api
        approvalDispatch({type: 'setApprovalCount', count: approvalState.count - 1});
        approvalDispatch({type: 'approval', approval: null});
      } else {
        // post the approval and dispatch the new approval count to the state. Dispatching is already done in the getapprovals and getApprovalCount functions.
        await postApproval(item.media_id, token);
        getApprovals();
        getApprovalCount();
      }
    } catch (e) {
      console.log('approval error', (e as Error).message);
    }
  };

  console.log(approvalState);

  return (
    <Button
      onPress={handleApproval}
      type="clear"
      containerStyle={{
        position: 'absolute',
        top: 1,
        right: 3,
        zIndex: 1,
      }}
    >
      <Icon
        type="material-community"
        color="#333"
        name={approvalState.userApproval ? 'thumb-up' : 'thumb-up-outline'}
      />
      <Badge
        value={approvalState.count}
        containerStyle={{position: 'absolute', top: 0, right: 0}}
      />
    </Button>
  );
};

export default Approvals;
