import Accordion from "react-bootstrap/Accordion";
import "../css/AccordionClient.css"

function AccordionClient(props) {
  return (
    <Accordion>
      <Accordion.Item id="AccordionData" eventKey={props.idChamado}>
        <Accordion.Header>Chamado N° {props.dadosChamado.id}</Accordion.Header>
        <Accordion.Body>
          <h4>
            Chamado aberto pelo(a) atendente {props.dadosChamado.id_atendente}
          </h4>
          <p>Motivo: {props.dadosChamado.mensagem}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionClient;
