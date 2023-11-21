import Accordion from 'react-bootstrap/Accordion';
import style from '../../../assets/style/common/filteredPage.module.css'

function AccordionComponent({title, id, subData, index, filerAction,categoryState}) {
  return (
    <>
    {
    <Accordion defaultActiveKey="">
      <Accordion.Item eventKey={index}>
        <Accordion.Header><p className={`${categoryState.activeFilterTitle === title ? style.activeFilter : ""} ${style.categoryTitleFilter}`} onClick={() => filerAction(title, id)}>{title}</p></Accordion.Header>
        <Accordion.Body>
            {subData?.map((subTitle, index) =>
                <h4  className={`${categoryState.activeSubFilterTitle === subTitle.name ? style.activeFilter : ""} ${style.subFilterTitle}`} key={index} onClick={() => filerAction(title, subTitle.main_id, subTitle.name, subTitle.id)}>{subTitle.name}</h4>
            )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    }
</>
  );
}

export default AccordionComponent;