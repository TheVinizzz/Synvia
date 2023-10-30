import { PasswordField } from '@/components/PasswordField'
import { register } from '@/services/users'
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useNavigate  } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {

    const navigate = useNavigate ();

    const mutation = useMutation({
        mutationFn: (newTodo: { name: string, email: string, password: string }) => {
            return register(newTodo)
        },
        onSuccess: () => {
            toast.success("Cadastro realizado com sucesso!");
            navigate("/")
            
        },
        onError: () => {
            toast.error("Cadastro não realizado, revise seus dados!");
        }
    })
    
    const formik = useFormik({
        initialValues: {
            name: '',
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
                            Já tem conta? <Link href="/">Login</Link>
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
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Input 
                                        id="name"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                </FormControl>
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
                                    id="password" 
                                    type="password" 
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </Stack>
                            <Stack spacing="6">
                                <Button type='submit' isLoading={mutation.isPending}>
                                    Registra-se
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Container>
    )
}

export default Register