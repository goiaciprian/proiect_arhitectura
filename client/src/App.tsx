import { Box, Button, CircularProgress, Divider, FormControl, FormLabel, HStack, Input, Select, VStack } from '@chakra-ui/react';
import React, {  useReducer } from 'react';
import {  EndpointCall } from '@/types';
import { useGatewayEndpoint } from '@/hooks/useGatewayEndpoint';
import { Message } from '@/components/Message';
import { StatsDisplay } from '@/components/Stats.display';
import { capitalizeAndFormat } from '@/utils';

const selectOptions = [
  'peoples',
  'companies',
]


interface FieldState <V> {
    error: null | string;
    value: V
}

interface State {
  nume: FieldState<string>;
  options: FieldState<EndpointCall>;
}


type ActionHelper<K extends keyof State,> = {
  key: K,
} & (
  {
    action: 'set_value',
    value: State[K]['value']
  } | {
    action: 'set_error',
    value: State[K]['error']
  }
)

type Action = ActionHelper<'nume'> | ActionHelper<'options'>


const initialState: State = {
  nume: {
    value: '',
    error: null,
  },
  options: {
    value: 'peoples',
    error: null
  }
}

function stateReducer(state: State, action: Action) {
  const newState = { ...state };
  switch(action.action) {
    case ('set_value'):
      newState[action.key] = { ...newState[action.key], value: action.value as unknown as any}
      return newState;
    case ('set_error'):
      newState[action.key] = { ...newState[action.key] as unknown as any, error: action.value}
      return newState;
    default:
      return newState;
  }
}


function App() {

    const [state, dispatch] = useReducer(stateReducer, initialState, () => initialState)
    const { data: responseCall, start: starCall } = useGatewayEndpoint();

    const { nume, options } = state;

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      starCall(nume.value, options.value);
    }


    const renderResponse = () => {
      switch (true) {
        case (responseCall.isFailed && responseCall.status === 429):
          return <Message message='Prea multe request-uri' />
        case (responseCall.isLoaded && responseCall.lastCall === 'companies'):
        case (responseCall.isLoaded && responseCall.lastCall === 'peoples'):
          return <StatsDisplay data={Object.keys(responseCall.data).map((key) => ({ label: capitalizeAndFormat(key), value: (responseCall.data as any)[key] }))} />
        case (!responseCall.isFailed && !responseCall.isLoaded && responseCall.isLoading):
          return <CircularProgress isIndeterminate />
        case (responseCall.isFailed && responseCall.status === 404):
          return <Message message='Nu s-a gasit niciun rezultat in baza de date' />
        default: 
          return <Message message='Nu au fost facute incercari'/>
      }
    };

  return (
    <>
      <VStack padding={'2rem'} >
        <Box>
          <form onSubmit={submit} >
            <HStack alignItems={'flex-end'} gap={'10'} >
              <FormControl >
                <FormLabel>Name</FormLabel>
                <Input value={nume.value} onChange={(e) => dispatch({ action: 'set_value', key: 'nume', value: e.target.value })} />
              </FormControl>
              
              <FormControl>
                <FormLabel>Options</FormLabel>
                <Select defaultValue={options.value} onChange={e => dispatch({ action: 'set_value', key: 'options', value: e.target.value as EndpointCall })} >
                  {selectOptions.map(opt => <option key={opt} value={opt}>{capitalizeAndFormat(opt)}</option>)}
                </Select>
              </FormControl>

              <Button type='submit' bg={'proiect'} padding={'0 30px'} >Search</Button>
              </HStack>
          </form>
        </Box>
        <Divider margin='35px' borderColor={'proiect'} borderWidth={'2px'} width={'70%'} />
        <Box>
          {renderResponse()}
        </Box>
      </VStack>
    </>
  )
}

export default App
