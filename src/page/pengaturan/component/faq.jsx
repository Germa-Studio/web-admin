import TextInput from '../../../components/uiComponents/inputComponents/textInput';
import { BsPersonGear } from 'react-icons/bs';
import { CiLocationArrow1 } from 'react-icons/ci';


export default function Faq(props){
    const {data} = props

    return(
        <div className="flex flex-col justify-between p-4 border border-solid border-gray-400 rounded-lg">
            <div className="flex space-x-2">
                <BsPersonGear size="30px" />
                <TextInput
                id="question"
                name="question"
                label="Pertanyaan"
                value={data.question}
                onChange={(e) => setQuestion(e.target.value)}
                />
            </div>
            <div className="flex space-x-2">
                <CiLocationArrow1 size="30px" />
                <TextInput
                id="answer"
                name="answer"
                label="Jawaban"
                value={data.answer}
                onChange={(e) => setAnswer(e.target.value)}
                />
            </div>
        </div>
    )
}