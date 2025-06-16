import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Heart,
  BarChart3,
  Users,
  ArrowUpDown,
  User
} from "lucide-react";

const NFTItemDetails = () => {
  const [itemData, setItemData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  const mockItemData = {
    id: "nft_1155",
    title: "Rocketbyz x PMT Loyalty NFTs",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
    tags: ["#Physical", "#Non-Tradeable"],
    description:
      "Lorem ipsum dolor sit amet consectetur. Donec leo pellentesque orci tempus nunc odio convallis. Sagittis facilisis ridiculus et arcu tellus.",
    creator: {
      address: "0x76ff25cc...b11wa",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    collection: {
      name: "NFT 1155",
      avatar:
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=40&h=40&fit=crop"
    },
    history: [
      {
        action: "Bought",
        timeAgo: "1 day ago",
        user: {
          address: "0x76ff25cc...b11wa",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        }
      }
    ],
    relatedProducts: []
  };

  useEffect(() => {
    // Simulate API call
    const fetchItemDetails = async () => {
      try {
        setLoading(true);

        // Uncomment and replace with actual API call
        // const response = await fetch(`/api/nft/${itemId}`);
        // const data = await response.json();
        // setItemData(data);

        // Mock delay
        setTimeout(() => {
          setItemData(mockItemData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, []);

  const handleBack = () => {
    // Navigate back functionality
    console.log("Navigate back");
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // API call to update like status
    // updateLikeStatus(itemData.id, !isLiked);
  };

  const handleBuyNow = () => {
    // Purchase functionality
    console.log("Buy now clicked");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Item not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-yellow-400 px-4 py-3 flex items-center justify-center relative">
        <button
          onClick={handleBack}
          className="absolute left-4 p-2 bg-white rounded-lg shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <span className="font-bold text-gray-800">PMT</span>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* NFT Image Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="relative">
            <div className="absolute top-4 left-4 z-10">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
            </div>
            <button
              onClick={toggleLike}
              className="absolute top-4 right-4 z-10"
            >
              <Heart
                className={`w-6 h-6 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
            <div className="aspect-square bg-gradient-to-br from-yellow-200 via-orange-200 to-brown-300 relative overflow-hidden">
              <img
                src={itemData.image}
                alt={itemData.title}
                className="w-full h-full object-cover opacity-80"
              />
              {/* Artistic overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brown-900/20"></div>
            </div>
          </div>
        </div>

        {/* Title and Tags */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">{itemData.title}</h1>
          <div className="flex space-x-2">
            {itemData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">{itemData.description}</p>

        {/* Creator and Collections */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Creator</h3>
            <div className="flex items-center space-x-3">
              <img
                src={itemData.creator.avatar}
                alt="Creator"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm font-medium text-gray-900">
                {itemData.creator.address}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Collections
            </h3>
            <div className="flex items-center space-x-3">
              <img
                src={itemData.collection.avatar}
                alt="Collection"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm font-medium text-gray-900">
                {itemData.collection.name}
              </span>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">History</h3>
          {itemData.history.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={item.user.avatar}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-medium text-gray-900">
                    {item.action}
                  </span>
                  <span className="text-gray-500 ml-1">{item.timeAgo}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.user.address}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl text-lg hover:bg-yellow-500 transition-colors"
        >
          Buy Now
        </button>

        {/* Related Products */}
        <div className="pb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Related Product
          </h3>
          {itemData.relatedProducts.length === 0 && (
            <div className="text-gray-400 text-center py-8">
              No related products found
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white">
        <div className="flex items-center justify-around py-3">
          <button className="flex flex-col items-center space-y-1">
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Explore</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">DAO</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 bg-white rounded-full"></div>
            <span className="text-xs">Staking</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <ArrowUpDown className="w-6 h-6" />
            <span className="text-xs">Swap</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Bottom padding to account for fixed nav */}
      <div className="h-20"></div>
    </div>
  );
};

// API Integration Functions (commented for future use)
/*
// Fetch item details from API
const fetchItemDetails = async (itemId) => {
  try {
    const response = await fetch(`/api/nft/${itemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch item details');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};

// Update like status
const updateLikeStatus = async (itemId, isLiked) => {
  try {
    const response = await fetch(`/api/nft/${itemId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ liked: isLiked })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update like status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating like status:', error);
    throw error;
  }
};

// Purchase NFT
const purchaseNFT = async (itemId, paymentMethod) => {
  try {
    const response = await fetch(`/api/nft/${itemId}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ 
        paymentMethod,
        // Add other purchase details
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to purchase NFT');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error purchasing NFT:', error);
    throw error;
  }
};

// Get auth token (implement based on your auth system)
const getAuthToken = () => {
  // Return auth token from localStorage, context, or other storage
  return localStorage.getItem('authToken');
};
*/

export default NFTItemDetails;
