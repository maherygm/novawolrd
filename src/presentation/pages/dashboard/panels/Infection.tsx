import { useEffect, useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
// Données JSON statiques
const infectionsData = [
    { id: 1, name: "John Doe", age: 35, status: "infected" },
    { id: 2, name: "Jane Smith", age: 28, status: "recovered" },
    { id: 3, name: "Alice Johnson", age: 42, status: "infected" },
    { id: 4, name: "Bob Brown", age: 50, status: "deceased" },
    { id: 5, name: "Charlie Davis", age: 30, status: "infected" },
    { id: 6, name: "Eve White", age: 25, status: "recovered" },
    { id: 7, name: "Frank Wilson", age: 60, status: "infected" },
    { id: 8, name: "Grace Lee", age: 45, status: "recovered" },
    { id: 9, name: "Henry Moore", age: 55, status: "deceased" },
    { id: 10, name: "Ivy Taylor", age: 40, status: "infected" }
  ];
  
  const virusesData = [
    { id: 1, name: "COVID-19", description: "Coronavirus disease 2019" },
    { id: 2, name: "Influenza", description: "Seasonal flu virus" },
    { id: 3, name: "HIV", description: "Human Immunodeficiency Virus" },
    { id: 4, name: "Ebola", description: "Ebola virus disease" },
    { id: 5, name: "Zika", description: "Zika virus" },
    { id: 6, name: "Dengue", description: "Dengue fever virus" },
    { id: 7, name: "Hepatitis B", description: "Hepatitis B virus" },
    { id: 8, name: "Measles", description: "Measles virus" },
    { id: 9, name: "Rabies", description: "Rabies virus" },
    { id: 10, name: "Polio", description: "Poliovirus" }
  ];
  
  const vaccinesData = [
    { id: 1, name: "Pfizer-BioNTech", manufacturer: "Pfizer, Inc.", efficacy: 95 },
    { id: 2, name: "Moderna", manufacturer: "ModernaTX, Inc.", efficacy: 94 },
    { id: 3, name: "AstraZeneca", manufacturer: "AstraZeneca", efficacy: 76 },
    { id: 4, name: "Johnson & Johnson", manufacturer: "Janssen Pharmaceuticals", efficacy: 66 },
    { id: 5, name: "Sinovac", manufacturer: "Sinovac Biotech", efficacy: 51 },
    { id: 6, name: "Sputnik V", manufacturer: "Gamaleya Research Institute", efficacy: 92 },
    { id: 7, name: "Sinopharm", manufacturer: "Beijing Institute of Biological Products", efficacy: 79 },
    { id: 8, name: "Novavax", manufacturer: "Novavax, Inc.", efficacy: 89 },
    { id: 9, name: "Covaxin", manufacturer: "Bharat Biotech", efficacy: 78 },
    { id: 10, name: "CanSino", manufacturer: "CanSino Biologics", efficacy: 65 }
  ];
  
  export default function InfectionPage() {
    const [activeTab, setActiveTab] = useState("infection");
    const [infections, setInfections] = useState(infectionsData);
    const [viruses, setViruses] = useState(virusesData);
    const [vaccines, setVaccines] = useState(vaccinesData);
  
    return (
      <div className="p-4">
        <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
          <Tab key="infection" title="Infections" />
          <Tab key="virus" title="Virus" />
          <Tab key="vaccin" title="Vaccins" />
        </Tabs>
        <div className="mt-4">
          {activeTab === "infection" && <InfectionTab data={infections} setData={setInfections} />}
          {activeTab === "virus" && <VirusTab data={viruses} />}
          {activeTab === "vaccin" && <VaccinTab data={vaccines} />}
        </div>
      </div>
    );
  }
  
  function InfectionTab({ data, setData }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newInfection, setNewInfection] = useState({ name: "", age: "", status: "infected" });
  
    const handleAdd = () => {
        if (!newInfection.name || !newInfection.age) {
          alert("Veuillez remplir tous les champs.");
          return;
        }
        setData([...data, { id: data.length + 1, ...newInfection }]);
        setNewInfection({ name: "", age: "", status: "infected" }); // Réinitialiser les champs
        onClose(); // Fermer le modal
      };
  
    const updateStatus = (id, status, setData) => {
      setData((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    };
  
    return (
      <Card className={'bg-transparent shadow-none p-0'}>
        <CardBody>
            <div onClick={onOpen}>
          <Button  color="primary" className="mb-4">Ajouter Infection</Button>
          </div>
          <Table aria-label="Liste des infections">
            <TableHeader>
              <TableColumn>Nom</TableColumn>
              <TableColumn>Âge</TableColumn>
              <TableColumn>Statut</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => updateStatus(item.id, "recovered", setData)}>Guéri</Button>
                    <Button onClick={() => updateStatus(item.id, "deceased", setData)} className="ml-2" color="danger">Décédé</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalHeader>Ajouter une Infection</ModalHeader>
          <ModalBody>
            <Input label="Nom" placeholder="Nom" fullWidth onChange={(e) => setNewInfection({ ...newInfection, name: e.target.value })} />
            <Input label="Âge" placeholder="Âge" type="number" fullWidth className="mt-2" onChange={(e) => setNewInfection({ ...newInfection, age: e.target.value })} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} color="secondary">Annuler</Button>
            <Button onClick={handleAdd} color="primary">Ajouter</Button>
          </ModalFooter>
        </Modal>
      </Card>
    );
  }
  
  function VirusTab({ data }) {
    return (
      <Card className={'bg-transparent shadow-none p-0'}>
        <CardBody>
          <Table aria-label="Liste des virus">
            <TableHeader>
              <TableColumn>Nom</TableColumn>
              <TableColumn>Description</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((virus) => (
                <TableRow key={virus.id}>
                  <TableCell>{virus.name}</TableCell>
                  <TableCell>{virus.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    );
  }
  
  function VaccinTab({ data }) {
    return (
      <Card className={'bg-transparent shadow-none p-0'}>
        <CardBody>
          <Table aria-label="Liste des vaccins">
            <TableHeader>
              <TableColumn>Nom</TableColumn>
              <TableColumn>Fabricant</TableColumn>
              <TableColumn>Efficacité</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((vaccin) => (
                <TableRow key={vaccin.id}>
                  <TableCell>{vaccin.name}</TableCell>
                  <TableCell>{vaccin.manufacturer}</TableCell>
                  <TableCell>{vaccin.efficacy}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    );
  }