import { DataTable } from "@/components/DataTable"
import useTasks from "@/hooks/useTasks";
import { ITask } from "@/services/tasks/types";
import { Box, Button, CircularProgress, FormControl, FormLabel, Input, Select, Stack, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from '@chakra-ui/icons'
import { useMutation } from "@tanstack/react-query";
import { addTask, deleteTask } from "@/services/tasks";
import { toast } from "react-toastify";
import queryClient from "@/utils/queryClient";
import useUsers from "@/hooks/useUsers";
import { useFormik } from "formik";

const Tasks = () => {

    const { data, isError, isLoading } = useTasks();
    const { data: users } = useUsers()

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (id: string) => {
            return deleteTask(id)
        },
        onSuccess: () => {
            toast.success("Task excluida!");
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: () => {
            toast.error("Verifique sua task!");
        }
    })

    const mutationAddTask = useMutation({
        mutationFn: (data: {title: string, description: string, responsible: string}) => {
            return addTask(data)
        },
        onSuccess: () => {
            toast.success("Task adicionada!");
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: () => {
            toast.error("Verifique sua task!");
        }
    })

    const columnHelper = createColumnHelper<ITask>();

    const columns = [
        columnHelper.accessor("title", {
            cell: (info) => info.getValue(),
            header: "Titulo",

        }),
        columnHelper.accessor("description", {
            cell: (info) => info.getValue(),
            header: "Descrição"
        }),
        columnHelper.accessor("responsible", {
            cell: (info) => info.getValue(),
            header: "Responsavel",
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor("tags", {
            cell: (info) => info.getValue(),
            header: "Tags"
        }),
        columnHelper.accessor("createdAt", {
            cell: (info) => moment(info.getValue()).format("DD/MM/YYYY"),
            header: "Criado",

        }),
        columnHelper.accessor("id", {
            cell: (id) => (
                <Box>
                    <CloseIcon cursor="pointer" onClick={() => mutation.mutate(id.getValue())} />
                </Box>
            ),
            header: "Ações",

        }),
    ];

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            responsible: '',
        },
        onSubmit: async (values, { resetForm }) => {
            await mutationAddTask.mutateAsync(values)
            resetForm()
        },
    })

    if (isLoading) return (
        <Box width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <CircularProgress isIndeterminate color='blue.300' />
            <Text fontSize="20px" marginTop="10px" fontWeight="semibold">
                Carregando...
            </Text>
        </Box>
    )

    if (isError) return navigate("/")

    return (
        <Box display="flex" flexDirection="column" width="100%" height="100%" justifyContent="center" alignItems="center">
            <Box maxWidth="70%">
                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" gap="10px" alignItems="end" marginBottom="10px">
                        <FormControl>
                            <FormLabel htmlFor="title">Titulo</FormLabel>
                            <Input
                                id="title"
                                size="sm"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="description">Descrição</FormLabel>
                            <Input
                                id="description"
                                size="sm"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="responsible">Responsavel</FormLabel>
                            <Select 
                                placeholder='Responsavel' 
                                size="sm"
                                id="responsible"
                                onChange={formik.handleChange}
                                value={formik.values.responsible}
                            >
                                {users?.map(val => (
                                    <option value={val.id}>{val.name}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <Button size="sm" type="submit">
                            Enviar
                        </Button>
                    </Box>
                </form>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={{ base: 'transparent', sm: 'bg.surface' }}
                    boxShadow={{ base: 'none', sm: 'md' }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                    backgroundColor="#fff"
                    overflow="hidden"
                    overflowX="auto"
                >
                    <Stack spacing="6">
                        <DataTable columns={columns} data={data || []} />
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default Tasks