// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import TodayTask from 'src/views/task/TodayTask'
import OtherTask from 'src/views/task/TodayTask'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import Tugas from 'src/views/dashboard/Tugas'

const Dashboard = () => {
    return (
        <ApexChartWrapper>
        <Grid container md={14}>
            <Grid item xs={12} mb={5}>
                <Card>
                    <CardHeader title="Today's Task"  titleTypographyProps={{ variant: 'h6' }} />
                    <TodayTask />
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Other's Task"  titleTypographyProps={{ variant: 'h6' }} />
                    <OtherTask />
                </Card>
            </Grid>
        </Grid>
        </ApexChartWrapper>
    )
}

export default Dashboard
