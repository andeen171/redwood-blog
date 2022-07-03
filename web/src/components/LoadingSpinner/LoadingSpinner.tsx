import { AiOutlineLoading } from 'react-icons/ai'

interface Props {
  size?: number
}

const Loading = ({ size = 50 }: Props) => {
  return <AiOutlineLoading className="animate-spin text-blue-700 dark:text-sky-700 m-auto" size={size} />
}

export default Loading
