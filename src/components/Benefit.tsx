import {
  Center,
  Container,
  createStyles,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import DownloadButton from "components/DownloadButton";
import Quote from "components/Quote";

const Benefit: React.FC<{
  title: string;
  description: string;
  quote?: {
    content: string;
    author: string;
  };
  image: string;
  actionText?: string;
}> = ({ title, description, image, quote, actionText }) => {
  return (
    <Center
      sx={{
        minHeight: "95vh",
      }}
    >
      <Stack spacing="xl">
        <Container>
          <Stack sx={{ flex: 2 }} spacing="xl">
            <Stack>
              <Title
                color="purple"
                sx={(theme) => ({
                  color: theme.colors.purple[4],
                })}
              >
                {title}
              </Title>
              <Text
                sx={(theme) => ({ fontSize: theme.fontSizes.lg, opacity: 0.8 })}
              >
                {description}
              </Text>
            </Stack>
            {quote && <Quote {...quote} />}
          </Stack>
        </Container>

        <Image
          width="100%"
          src={image}
          sx={(theme) => ({
            flex: 3,
            borderRadius: theme.radius.md,
            overflow: "hidden",
            boxShadow: theme.shadows.lg,
          })}
        />
        {actionText && (
          <DownloadButton size="lg" label={actionText} variant="light" />
        )}
      </Stack>
    </Center>
  );
};

export default Benefit;
