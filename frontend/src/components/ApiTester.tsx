import React, { useState } from 'react';
import {
  Box,
  Button,
  Select,
  Input,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  useToast
} from '@chakra-ui/react';
import Editor from "@monaco-editor/react";
import { ServiceService } from '../services/cortecloud/service.service';
import { MaterialsService } from '../services/cortecloud/materials.service';

const ApiTester: React.FC = () => {
  const [endpoint, setEndpoint] = useState('services');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    status: '6',
    limit: '100',
    offset: '0'
  });
  const [detailId, setDetailId] = useState<string>('');
  const toast = useToast();

  const serviceClient = new ServiceService();
  const materialsClient = new MaterialsService();

  const handleTest = async () => {
    setLoading(true);
    try {
      let result;
      
      switch(endpoint) {
        case 'services':
          if (detailId) {
            result = await serviceClient.getServiceDetail(Number(detailId));
          } else {
            result = await serviceClient.getServices({
              status: Number(params.status),
              limit: Number(params.limit),
              offset: Number(params.offset)
            });
          }
          break;
        case 'materials/boards':
          result = detailId ? 
            await materialsClient.getBoardDetail(detailId) : 
            await materialsClient.getBoards();
          break;
        case 'materials/edges':
          result = await materialsClient.getEdges();
          break;
        case 'materials/components':
          result = await materialsClient.getComponents();
          break;
        default:
          throw new Error("Endpoint no implementado");
      }

      setResponse(result);
      toast({
        title: "Success",
        description: "API call completed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('API Error:', error);
      setResponse({ error: error.message });
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <Heading size="lg">CorteCloud API Tester</Heading>
          
          <FormControl>
            <FormLabel>Endpoint</FormLabel>
            <Select 
              value={endpoint} 
              onChange={(e) => setEndpoint(e.target.value)}
            >
              <option value="services">Services</option>
              <option value="materials/boards">Boards</option>
              <option value="materials/edges">Edges</option>
              <option value="materials/components">Components</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>ID/Código (opcional)</FormLabel>
            <Input 
              value={detailId}
              onChange={(e) => setDetailId(e.target.value)}
              placeholder="ID para consultas de detalle"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Status (Estado del Servicio)</FormLabel>
            <Select 
              value={params.status}
              onChange={(e) => setParams({...params, status: e.target.value})}
            >
              <option value="4">4 - Aguardando Autorización</option>
              <option value="6">6 - Servicio Autorizado</option>
              <option value="7">7 - Enviado a Producción</option>
              <option value="9">9 - Finalizado</option>
              <option value="17">17 - Aguardando Revisión</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Limit</FormLabel>
            <Input 
              value={params.limit}
              onChange={(e) => setParams({...params, limit: e.target.value})}
              placeholder="Cantidad de registros a retornar"
            />
          </FormControl>

          <Button 
            colorScheme="blue"
            onClick={handleTest}
            isLoading={loading}
          >
            Test API
          </Button>

          {response && (
            <Box>
              <Text mb={2} fontWeight="bold">Response:</Text>
              <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
                <Editor
                  height="300px"
                  defaultLanguage="json"
                  value={JSON.stringify(response, null, 2)}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false }
                  }}
                />
              </Box>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ApiTester;
