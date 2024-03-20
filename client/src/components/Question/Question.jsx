import PropTypes from 'prop-types';
const Question = ({key, question, options, number, responses, setResponses}) => {
  return (
    <div className="grid items-start gap-4">
    <div className="text-xl font-semibold" key={key}>{number}. {question}</div>
    <div className="grid items-start gap-2">

        {options.map((option) => {
            return (
                <div className="flex items-center gap-2" key={option.id}>
                    <input
                        className="form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500"
                        id={option.text}
                        name="question1"
                        type="radio"
                    />
                    <label className="text-sm cursor-pointer dark:text-gray-400" htmlFor={option.id}>
                        {option.text}
                    </label>
                </div>
            )

        })}
    </div>
  </div>
  )
}


Question.propTypes = {
   key: PropTypes.string,
   question: PropTypes.string.isRequired,
   options: PropTypes.arrayOf(PropTypes.shape({
     id: PropTypes.string.isRequired,
     text: PropTypes.string.isRequired,
   })).isRequired,
   number: PropTypes.number.isRequired,
};

export default Question


