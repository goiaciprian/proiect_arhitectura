import { HStack, Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react"

interface StatsDisplayProps {
    data: { label: string, value: any }[]
}

export const StatsDisplay = ({
    data
}: StatsDisplayProps) => {
    return (
        <HStack>
            <StatGroup gap={'50px'} >
                {data.map(item => {
                    return (
                        <Stat key={item.label}>
                            <StatLabel>{item.label}</StatLabel>
                            <StatNumber width='max-content' >{item.value}</StatNumber>
                        </Stat>
                    )
                })}
            </StatGroup>
        </HStack>
    )
}