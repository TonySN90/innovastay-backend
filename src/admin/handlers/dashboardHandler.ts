import LandlordModel from '../../models/landlordModel';
import LodgingModel from '../../models/lodgingModel';
import AdministratorModel from '../../models/administratorModel';

export interface DashboardData {
  totalLandlords: number;
  totalLodgings: number;
  totalAdmins: number;
  recentLandlords: number;
  recentLodgings: number;
  averagePrice: number;
  topLocations: { location: string; count: number }[];
  topAmenities: { amenity: string; count: number }[];
}

export const dashboardHandler = async (): Promise<{ data: DashboardData }> => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Basic counts
    const [totalLandlords, totalLodgings, totalAdmins] = await Promise.all([
      LandlordModel.countDocuments(),
      LodgingModel.countDocuments(),
      AdministratorModel.countDocuments()
    ]);

    // Recent registrations (last 30 days)
    const [recentLandlords, recentLodgings] = await Promise.all([
      LandlordModel.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      LodgingModel.countDocuments({ createdAt: { $gte: thirtyDaysAgo } })
    ]);

    // Average price calculation
    const priceStats = await LodgingModel.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: '$pricePerNight' }
        }
      }
    ]);
    const averagePrice = priceStats.length > 0 ? Math.round(priceStats[0].averagePrice) : 0;

    // Top locations
    const locationStats = await LodgingModel.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $project: {
          location: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    // Top amenities - flatten the amenities arrays and count occurrences
    const amenityStats = await LodgingModel.aggregate([
      { $unwind: '$amenities' },
      {
        $group: {
          _id: '$amenities',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $project: {
          amenity: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    const data: DashboardData = {
      totalLandlords,
      totalLodgings,
      totalAdmins,
      recentLandlords,
      recentLodgings,
      averagePrice,
      topLocations: locationStats,
      topAmenities: amenityStats
    };

    return { data };
  } catch (error) {
    console.error('Dashboard handler error:', error);
    return {
      data: {
        totalLandlords: 0,
        totalLodgings: 0,
        totalAdmins: 0,
        recentLandlords: 0,
        recentLodgings: 0,
        averagePrice: 0,
        topLocations: [],
        topAmenities: []
      }
    };
  }
};