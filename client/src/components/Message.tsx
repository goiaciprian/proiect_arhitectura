import { Text } from '@chakra-ui/react';

export const Message = ({
    message
}: { message: string }) => {
    return <Text fontSize={'3xl'}>{message}</Text>
}