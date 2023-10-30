import { PasswordField } from '@/components/PasswordField'
import { signIn } from '@/services/users';
import { useUser } from '@/store';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate()

    const { setAuthenticate }: any = useUser.getState()

    const mutation = useMutation({
        mutationFn: (newTodo: {email: string, password: string}) => {
          return signIn(newTodo)
        },
        onSuccess: () => {
            toast.success("Login realizado com sucesso!");
            setAuthenticate(true)
            navigate("/tasks")
        },
        onError: () => {
            toast.error("Login não autorizado!");
        }
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            await mutation.mutateAsync(values)
        },
    })
    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="6">
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Text color="fg.muted" fontSize="20px" fontWeight="semibold">
                            Ainda não tem conta? <Link href="/register">Cadastrar-se</Link>
                        </Text>
                    </Stack>
                </Stack>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg={{ base: 'transparent', sm: 'bg.surface' }}
                        boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                        backgroundColor="#fff"
                    >
                        <Stack spacing="6">
                            <Stack spacing="5">
                                <FormControl>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                </FormControl>
                                <PasswordField 
                                    id='password'
                                    name='password'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </Stack>
                            <HStack justify="space-between">
                                <Checkbox defaultChecked>Lembre-se</Checkbox>
                            </HStack>
                            <Stack spacing="6">
                                <Button type='submit' isLoading={Boolean(mutation?.status === "pending")}>
                                    Entrar
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Container>
    )
}

export default Login