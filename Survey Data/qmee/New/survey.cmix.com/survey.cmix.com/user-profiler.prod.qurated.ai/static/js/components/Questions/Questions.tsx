import React from 'react'
import SelectionControls from './SelectionControls'
import MultiPunchControls from './MultiPunchControls'
import AcceptControls from './AcceptQuestion'
import TextControls from './TextControls'
import ChildrenControls from './ChildQuestion'
import DateOfBirthControls from './DateOfBirthQuestion'
import ConsentQuestion from './ConsentQuestion/ConsentQuestion';
import AddressControls from './AddressQuestion'

const CONSENT_QUESTION_KEY = '15b6';

const QuestionControls = (props: any) => {
  if(props.question.key === CONSENT_QUESTION_KEY) {
    return <ConsentQuestion {...props}/>
  }
  switch (props.question.type) {
    case 'multi_punch':
      return <MultiPunchControls {...props} />
    case 'children':
      return <ChildrenControls {...props} />
    case 'selection':
      return <SelectionControls {...props} />
    case 'input':
      return <TextControls {...props} />
    case 'date':
      return <DateOfBirthControls {...props}/>
    case 'accept':
      return <AcceptControls {...props} />
    case 'address':
      return <AddressControls {...props} />
    default:
      return (<p>"{props.question.type}" is not supported</p>)
  }
}

export default QuestionControls
